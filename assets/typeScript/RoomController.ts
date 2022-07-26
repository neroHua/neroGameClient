import GameUserMO from "./bean/game/user/GameUserMO";
import HttpResponse from "./bean/http/HttpResponse";
import RoomUserInformationResponse from "./bean/http/user/RoomUserInformationResponse";
import UserChangePreparedStatusRequest from "./bean/http/user/UserChangePreparedStatusRequest";
import WebSocketConfig from "./config/WebSocketConfig";
import LocalStorageConstant from "./constant/LocalStorageConstant";
import ResourceConstant from "./constant/ResourceConstant";
import RoomConstant from "./constant/RoomConstant";
import UrlConstant from "./constant/UrlConstant";
import UserConvert from "./convert/UserConvert";
import Card, { CardEnumeration, convertServerCardNameListToClientCardList } from "./enumeration/CardEnumeration";
import { MessageTypeEnumeration } from "./enumeration/MessageTypeEnumeration";
import HttpManager from "./net/HttpManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RoomController extends cc.Component {

    private webSocket : WebSocket = null;

    private userList : Array<GameUserMO>;

    private readonly MAX_USER_COUNT : number = 3;

    private cardAtlas: cc.SpriteAtlas = null;

    start () {
      this.initWebSocket();
      this.initUserList();
      this.initCardAtlas();
    }

    private initWebSocket() {
      let userInformationString = cc.sys.localStorage.getItem(LocalStorageConstant.USER_INFORMATION);
      let userInformation = JSON.parse(userInformationString);
  
      this.webSocket = new WebSocket(WebSocketConfig.HTTP_URL_PRE_FIX + userInformation.userId);
  
      this.webSocket.onopen = this.onOpen;
      this.webSocket.onclose = this.onClose;
      this.webSocket.onerror = this.onError;
      this.webSocket.onmessage = (message) => {
        this.onMessage(message);
      };
    }

    private initUserList() : void {
      let userResponse : HttpResponse<Array<RoomUserInformationResponse>> = HttpManager.get(null, UrlConstant.ROOM_USER_LIST);
      let userListTemp = UserConvert.convertResponseToMOForList(userResponse.data);

      let userInformationString = cc.sys.localStorage.getItem(LocalStorageConstant.USER_INFORMATION);
      let userInformation = JSON.parse(userInformationString);
      let i = 0;
      for (; i < userListTemp.length; i++) {
        if (userListTemp[i].getUserId() === userInformation.userId) {
          break;
        }
      }

      this.userList = userListTemp.splice(i);
      userListTemp.forEach(element => {
        this.userList.push(element);
      });

      for (i = 0; i < this.userList.length; i++) {
        let userNode = this.node.getChildByName(RoomConstant.USER_NODE_NAME_PREFIX + i);
        let userInforMationNode = userNode.getChildByName(RoomConstant.USER_INFORMATION_NODE_NAME);
        userInforMationNode.getComponent(cc.Label).string = this.userList[i].getUserId();

        let preparedNode = userNode.getChildByName(RoomConstant.PREPARE_NODE_NAME);
        if (this.userList[i].getPrepared()) {
          preparedNode.children[0].getComponent(cc.Label).string = RoomConstant.PREPARE_NODE_LABEL_YES;
        }
        else {
          preparedNode.children[0].getComponent(cc.Label).string = RoomConstant.PREPARE_NODE_LABEL_NO;
        }
      }

      for (; i < this.MAX_USER_COUNT; i++) {
        let userNode = this.node.getChildByName(RoomConstant.USER_NODE_NAME_PREFIX + i);
        userNode.active = false;
      }
    }

    private initCardAtlas() {
      cc.loader.loadRes(ResourceConstant.CARD_LIST_ATLAS_URL, cc.SpriteAtlas, (error, resources) => {
        this.cardAtlas = resources;
      });
    }

    private onOpen() {
      console.log('链接成功');
    }
  
    private onClose() {
      console.log('链接关闭');
    }
  
    private onError() {
      console.log('链接出错');
    }

    public onMessage(message) {
      console.log(message.data, '获得消息');
      let messageObject = JSON.parse(message.data);

      if (messageObject.messageTypeEnumeration === MessageTypeEnumeration.USER_JOIN_ROOM.getServerMessageName()) {
        let userId : string = messageObject.userId;
        this.dealUserJoinRoomMessage(userId);
      } 
      else if (messageObject.messageTypeEnumeration === MessageTypeEnumeration.CHANGE_USER_PREPARE_STATUS.getServerMessageName()) {
        let userId : string = messageObject.userId;
        let prepared : boolean = messageObject.prepared;
        this.dealChangeUserPrepareStatusMessage(userId, prepared);
      } 
      else if (messageObject.messageTypeEnumeration === MessageTypeEnumeration.DEAL_CARD.getServerMessageName()) {
        let cardEnumerationList : Array<string> = messageObject.cardEnumerationList;
        let cardList : Array<Card> = convertServerCardNameListToClientCardList(cardEnumerationList);
        this.dealDealCardMessage(cardList);
      } 
    }

    public dealUserJoinRoomMessage(userId : string) : void {
      let seatIndex = this.userList.length;
      let gameUserMO : GameUserMO = new GameUserMO(userId);
      gameUserMO.setPrepared(true);
      this.userList.push(gameUserMO);

      let userNode = this.node.getChildByName(RoomConstant.USER_NODE_NAME_PREFIX + seatIndex);
      let userInforMationNode = userNode.getChildByName(RoomConstant.USER_INFORMATION_NODE_NAME);
      userInforMationNode.getComponent(cc.Label).string = this.userList[seatIndex].getUserId();

      userNode.active = true;
    }

    public dealChangeUserPrepareStatusMessage(userId : string, prepared : boolean) : void {
      let gameUserMO : GameUserMO = null;
      let i = 0;
      for (; i < this.userList.length; i++) {
        if (this.userList[i].getUserId() === userId) {
          break;
        }
      }
      gameUserMO = this.userList[i];

      gameUserMO.setPrepared(prepared);
      let userNode = this.node.getChildByName(RoomConstant.USER_NODE_NAME_PREFIX + i);
      let preparedNode = userNode.getChildByName(RoomConstant.PREPARE_NODE_NAME);
      if (this.userList[i].getPrepared()) {
        preparedNode.children[0].getComponent(cc.Label).string = RoomConstant.PREPARE_NODE_LABEL_YES;
      }
      else {
        preparedNode.children[0].getComponent(cc.Label).string = RoomConstant.PREPARE_NODE_LABEL_NO;
      }
    }

    public dealDealCardMessage(cardList : Array<Card>) : void {
      this.userList[0].setCardList(cardList);

      let userNode = this.node.getChildByName(RoomConstant.USER_NODE_NAME_ME);
      let cardListNode : cc.Node = userNode.getChildByName(RoomConstant.CARD_LIST_NODE_NAME);
      cardListNode.removeAllChildren();
      for (let i = 0; i < cardList.length; i++) {
        let cardNode = new cc.Node();
        cardNode.y = cardListNode.y;

        let cardSprite : cc.Sprite = cardNode.addComponent(cc.Sprite);
        cardSprite.spriteFrame = this.cardAtlas.getSpriteFrame(cardList[i].getCode());

        cardListNode.addChild(cardNode);
      }
      cardListNode.active = true;

      for (let j = 1; j < this.MAX_USER_COUNT; j++) {
        let userNode = this.node.getChildByName(RoomConstant.USER_NODE_NAME_PREFIX + j);
        let cardListNode : cc.Node = userNode.getChildByName(RoomConstant.CARD_LIST_NODE_NAME);
        cardListNode.removeAllChildren();
        for (let i = 1; i < cardList.length; i++) {
          let cardNode = new cc.Node();
          cardNode.y = cardListNode.y;

          let cardSprite : cc.Sprite = cardNode.addComponent(cc.Sprite);
          cardSprite.spriteFrame = this.cardAtlas.getSpriteFrame(CardEnumeration.CARD_500.getCode());

          cardListNode.addChild(cardNode);
        }
      }
    }

    public changePrepareStatus() : void {
      let oldPrepared : boolean = this.userList[0].getPrepared();
      let userChangePreparedStatusRequest : UserChangePreparedStatusRequest = new UserChangePreparedStatusRequest(!oldPrepared);
      HttpManager.post(userChangePreparedStatusRequest, UrlConstant.ROOM_CHANGE_USER_PREPARE_STATUS);

      this.userList[0].setPrepared(!oldPrepared);
      let userNode = this.node.getChildByName(RoomConstant.USER_NODE_NAME_ME);
      let preparedNode : cc.Node = userNode.getChildByName(RoomConstant.PREPARE_NODE_NAME);
      if (!oldPrepared) {
        preparedNode.children[0].getComponent(cc.Label).string = RoomConstant.PREPARE_NODE_LABEL_YES;
      }
      else {
        preparedNode.children[0].getComponent(cc.Label).string = RoomConstant.PREPARE_NODE_LABEL_NO;
      }
    }

}
