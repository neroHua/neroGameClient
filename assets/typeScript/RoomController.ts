import RoundMO from "./bean/game/round/RoundMO";
import GameUserMO from "./bean/game/user/GameUserMO";
import HttpResponse from "./bean/http/HttpResponse";
import RoomUserInformationResponse from "./bean/http/user/RoomUserInformationResponse";
import UserChangePreparedStatusRequest from "./bean/http/user/UserChangePreparedStatusRequest";
import UserPlayCardRequest from "./bean/http/user/UserPlayCardRequest";
import WebSocketConfig from "./config/WebSocketConfig";
import LocalStorageConstant from "./constant/LocalStorageConstant";
import ResourceConstant from "./constant/ResourceConstant";
import RoomConstant from "./constant/RoomConstant";
import SceneConstant from "./constant/SceneConstant";
import UrlConstant from "./constant/UrlConstant";
import UserConvert from "./convert/UserConvert";
import Card, { CardEnumeration, convertClientCardListToServerCardNameList, convertCodeListToClientCardList, convertServerCardNameListToClientCardList } from "./enumeration/CardEnumeration";
import { MessageTypeEnumeration } from "./enumeration/MessageTypeEnumeration";
import HttpManager from "./net/HttpManager";
import CardUtil from "./util/CardUtil";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RoomController extends cc.Component {

    private webSocket : WebSocket = null;

    private userList : Array<GameUserMO>;

    private readonly MAX_USER_COUNT : number = 3;

    private cardAtlas: cc.SpriteAtlas = null;

    private roundMO : RoundMO = null;

    private playCardSet: Set<cc.Node> = new Set();

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
      this.userList = UserConvert.convertResponseToMOForList(userResponse.data);

      this.rearrangeUserSeat();
    }

  private rearrangeUserSeat() {
    let meIndex = this.findMeIndexInUserList();

    let i: number = 0;
    for (i = 0; i < this.userList.length; i++) {
      let userNode = this.node.getChildByName(RoomConstant.USER_NODE_NAME_PREFIX + this.calculateSeatIndexByMeIndex(i, meIndex));
      console.log(userNode);
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
      let userNode = this.node.getChildByName(RoomConstant.USER_NODE_NAME_PREFIX + this.calculateSeatIndexByMeIndex(i, meIndex));
      userNode.active = false;
    }

    this.hideAllRobLandlordButton();
    this.hideAllPlayCardButton();
  }

  private findMeIndexInUserList() : number {
    let userInformationString = cc.sys.localStorage.getItem(LocalStorageConstant.USER_INFORMATION);
    let userInformation = JSON.parse(userInformationString);
    return this.findUserIndexInUserListByUserId(userInformation.userId);
  }

    public findUserIndexInUserListByUserId(userId : string) : number {
      for (let i = 0; i < this.userList.length; i++) {
        if (this.userList[i].getUserId() === userId) {
          return i;
        }
      }

      return null;
    }

    private calculateSeatIndexByMeIndex(userIndex : number, meIndex : number) : number {
      return (userIndex - meIndex + 3) % 3;
    }

    private calculateUserIndexByMeIndex(seatIndex: number, meIndex : number) : number {
      return (seatIndex + meIndex) % 3;
    }

    private findUserSeatIndexInUserListByUserId(userId : string) : number{
      let meIndex = this.findMeIndexInUserList();
      let userIndex = this.findUserIndexInUserListByUserId(userId);
      return this.calculateSeatIndexByMeIndex(userIndex, meIndex);
    }

    private hideAllRobLandlordButton() : void {
      for (let j = 0; j < this.MAX_USER_COUNT; j++) {
        let userNode : cc.Node = this.node.getChildByName(RoomConstant.USER_NODE_NAME_PREFIX + j);
        let robLandlordNode : cc.Node = userNode.getChildByName(RoomConstant.ROB_LANDLORD);
        robLandlordNode.active = false;
      }
    }

    private hideAllPlayCardButton() : void {
      for (let j = 0; j < this.MAX_USER_COUNT; j++) {
        let userNode : cc.Node = this.node.getChildByName(RoomConstant.USER_NODE_NAME_PREFIX + j);
        let robLandlordNode : cc.Node = userNode.getChildByName(RoomConstant.PLAY_CARD);
        robLandlordNode.active = false;
      }
    }

    private initCardAtlas() {
      cc.loader.loadRes(ResourceConstant.CARD_LIST_ATLAS_URL, cc.SpriteAtlas, (error, resources) => {
        this.cardAtlas = resources;
      });
    }

    private onOpen() {
      console.log('????????????');
    }
  
    private onClose() {
      console.log('????????????');
    }
  
    private onError() {
      console.log('????????????');
    }

    public onMessage(message) {
      console.log(message.data, '????????????');
      let messageObject = JSON.parse(message.data);

      if (messageObject.messageTypeEnumeration === MessageTypeEnumeration.USER_JOIN_ROOM.getServerMessageName()) {
        let userId : string = messageObject.userId;
        this.dealUserJoinRoomMessage(userId);
      } 
      else if (messageObject.messageTypeEnumeration === MessageTypeEnumeration.USER_LEAVE_ROOM.getServerMessageName()) {
        let userId : string = messageObject.userId;
        this.dealUserLeaveRoomMessage(userId);
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
      else if (messageObject.messageTypeEnumeration === MessageTypeEnumeration.USER_START_ROB_LANDLORD.getServerMessageName()) {
        let userId : string = messageObject.userId;
        this.dealUserStartRobLandlordMessage(userId);
      }
      else if (messageObject.messageTypeEnumeration === MessageTypeEnumeration.USER_DO_ROB_LANDLORD.getServerMessageName()) {
        let userId : string = messageObject.userId;
        this.dealUserDoRobLandlordMessage(userId);
      }
      else if (messageObject.messageTypeEnumeration === MessageTypeEnumeration.USER_DO_NOT_ROB_LANDLORD.getServerMessageName()) {
        let userId : string = messageObject.userId;
        this.dealUserDoNotRobLandlordMessage(userId);
      }
      else if (messageObject.messageTypeEnumeration === MessageTypeEnumeration.DEAL_LANDLORD_CARD.getServerMessageName()) {
        let userId : string = messageObject.userId;
        let cardEnumerationList : Array<string> = messageObject.cardEnumerationList;
        let cardList : Array<Card> = convertServerCardNameListToClientCardList(cardEnumerationList);
        this.dealDealLandlordCardMessage(userId, cardList);
      }
      else if (messageObject.messageTypeEnumeration === MessageTypeEnumeration.USER_START_TO_PLAY_CARD.getServerMessageName()) {
        let userId : string = messageObject.userId;
        this.dealUserStartToPlayCardMessage(userId);
      }
    }

    public dealUserJoinRoomMessage(userId : string) : void {
      let index = this.userList.length;
      let gameUserMO : GameUserMO = new GameUserMO(userId);
      gameUserMO.setPrepared(true);
      this.userList.push(gameUserMO);
      let meIndex = this.findMeIndexInUserList();

      let userNode = this.node.getChildByName(RoomConstant.USER_NODE_NAME_PREFIX + this.calculateSeatIndexByMeIndex(index, meIndex));
      let userInforMationNode = userNode.getChildByName(RoomConstant.USER_INFORMATION_NODE_NAME);
      userInforMationNode.getComponent(cc.Label).string = userId;

      userNode.active = true;
    }

    public dealUserLeaveRoomMessage(userId : string) : void {
      let seatIndex = this.findUserIndexInUserListByUserId(userId);
      this.userList.splice(seatIndex, 1);

      this.rearrangeUserSeat();
    }

    public dealChangeUserPrepareStatusMessage(userId : string, prepared : boolean) : void {
      let gameUserMO : GameUserMO = null;
      let userIndex : number = this.findUserIndexInUserListByUserId(userId);
      gameUserMO = this.userList[userIndex];
      let meIndex : number = this.findMeIndexInUserList();

      gameUserMO.setPrepared(prepared);
      let userNode = this.node.getChildByName(RoomConstant.USER_NODE_NAME_PREFIX + this.calculateSeatIndexByMeIndex(userIndex, meIndex));
      let preparedNode = userNode.getChildByName(RoomConstant.PREPARE_NODE_NAME);
      if (this.userList[userIndex].getPrepared()) {
        preparedNode.children[0].getComponent(cc.Label).string = RoomConstant.PREPARE_NODE_LABEL_YES;
      }
      else {
        preparedNode.children[0].getComponent(cc.Label).string = RoomConstant.PREPARE_NODE_LABEL_NO;
      }
    }

    public dealDealCardMessage(cardList : Array<Card>) : void {
      this.hideAllPrepareButton();

      this.showCardListForMe(cardList);
      this.showCardListForAllOther(cardList);

      CardUtil.sortOneCardList(0, cardList.length - 1, cardList);
      this.showCardListForMe(cardList);
    }

    public showCardListForMe(cardList : Array<Card>) : void {
      let meIndex = this.findMeIndexInUserList();
      this.userList[meIndex].setCardList(cardList);

      let userNode = this.node.getChildByName(RoomConstant.USER_NODE_NAME_ME);
      let cardListNode : cc.Node = userNode.getChildByName(RoomConstant.CARD_LIST_NODE_NAME);
      cardListNode.removeAllChildren();
      for (let i = 0; i < cardList.length; i++) {
        let cardNode = new cc.Node();
        cardNode.y = cardListNode.y;

        let cardSprite : cc.Sprite = cardNode.addComponent(cc.Sprite);
        cardSprite.spriteFrame = this.cardAtlas.getSpriteFrame(cardList[i].getCode());
        
        cardNode.on(cc.Node.EventType.TOUCH_START, (event : cc.Event) => {
          if (this.playCardSet.has(cardNode)) {
            this.playCardSet.delete(cardNode);
            cardNode.color = cc.Color.WHITE;
          }
          else {
            this.playCardSet.add(cardNode);
            cardNode.color = cc.Color.MAGENTA;
          }
        })

        cardListNode.addChild(cardNode);
      }

      cardListNode.active = true;
    }

    public showCardListForAllOther(cardList : Array<Card>) : void {
      let meIndex = this.findMeIndexInUserList();
      for (let j = 1; j < this.MAX_USER_COUNT; j++) {
        this.showCardListForOther(cardList, j, this.calculateUserIndexByMeIndex(j, meIndex));
      }
    }

    public showCardListForOther(cardList : Array<Card>, seatIndex : number, userIndex : number) : void {
      let otherCardList : Array<Card> = CardUtil.generateOtherUserCard(cardList);
      this.userList[userIndex].setCardList(otherCardList);

      let userNode = this.node.getChildByName(RoomConstant.USER_NODE_NAME_PREFIX + seatIndex);
      let cardListNode : cc.Node = userNode.getChildByName(RoomConstant.CARD_LIST_NODE_NAME);
      cardListNode.removeAllChildren();
      for (let i = 1; i < otherCardList.length; i++) {
        let cardNode = new cc.Node();
        cardNode.y = cardListNode.y;

        let cardSprite : cc.Sprite = cardNode.addComponent(cc.Sprite);
        cardSprite.spriteFrame = this.cardAtlas.getSpriteFrame(otherCardList[i].getCode());

        cardListNode.addChild(cardNode);
      }

      cardListNode.active = true;
    }

    public hideAllPrepareButton() : void {
      for (let j = 0; j < this.MAX_USER_COUNT; j++) {
        let userNode : cc.Node = this.node.getChildByName(RoomConstant.USER_NODE_NAME_PREFIX + j);
        let prepareNode : cc.Node = userNode.getChildByName(RoomConstant.PREPARE_NODE_NAME);
        prepareNode.active = false;
      }
    }

    public dealUserStartRobLandlordMessage(userId : string) : void {
      let seatIndex = this.findUserSeatIndexInUserListByUserId(userId);

      if (seatIndex === 0) {
        let userNode : cc.Node = this.node.getChildByName(RoomConstant.USER_NODE_NAME_ME);
        let robLandlordNode : cc.Node = userNode.getChildByName(RoomConstant.ROB_LANDLORD);
        robLandlordNode.active = true;
      }
      else {
        let userNode : cc.Node = this.node.getChildByName(RoomConstant.USER_NODE_NAME_PREFIX + seatIndex);
        let robLandlordNode : cc.Node = userNode.getChildByName(RoomConstant.ROB_LANDLORD);
        robLandlordNode.children[0].getComponent(cc.Label).string = RoomConstant.IN_ROB_LANDLORD;
        robLandlordNode.active = true;
      }
    }

    public dealUserDoRobLandlordMessage(userId : string) : void {
      let seatIndex = this.findUserSeatIndexInUserListByUserId(userId);

      let userNode : cc.Node = this.node.getChildByName(RoomConstant.USER_NODE_NAME_PREFIX + seatIndex);
      let robLandlordNode : cc.Node = userNode.getChildByName(RoomConstant.ROB_LANDLORD);
      robLandlordNode.children[0].getComponent(cc.Label).string = RoomConstant.DO_ROB_LANDLORD;
      robLandlordNode.active = true;
    }

    public dealUserDoNotRobLandlordMessage(userId : string) : void {
      let seatIndex = this.findUserSeatIndexInUserListByUserId(userId);

      let userNode : cc.Node = this.node.getChildByName(RoomConstant.USER_NODE_NAME_PREFIX + seatIndex);
      let robLandlordNode : cc.Node = userNode.getChildByName(RoomConstant.ROB_LANDLORD);
      robLandlordNode.children[0].getComponent(cc.Label).string = RoomConstant.DO_NOT_ROB_LANDLORD;
      robLandlordNode.active = true;
    }

    public dealDealLandlordCardMessage(userId : string, cardList : Array<Card>) : void {
      CardUtil.sortOneCardList(0, cardList.length - 1, cardList);

      this.showLandlordCardList(cardList);

      let meIndex = this.findMeIndexInUserList();
      let userIndex = this.findUserIndexInUserListByUserId(userId);
      let seatIndex = this.calculateSeatIndexByMeIndex(userIndex, meIndex);

      if (seatIndex === 0) {
        let userCardList = this.userList[userIndex].getCardList();
        cardList.forEach( element => {
          userCardList.push(element);
        });
        CardUtil.sortOneCardList(0, userCardList.length - 1, userCardList);
        this.showCardListForMe(userCardList);
      }
      else {
        let userCardList = this.userList[userIndex].getCardList();
        cardList.forEach( element => {
          userCardList.push(element);
        });
        this.showCardListForOther(userCardList, seatIndex, userIndex);
      }
      this.hideAllRobLandlordButton();
    }

    public showLandlordCardList(cardList : Array<Card>) : void {
      let landlordCardListNode : cc.Node = this.node.getChildByName(RoomConstant.LANDLORD_CARD_LIST_NODE_NAME);
      landlordCardListNode.removeAllChildren();
      for (let i = 0; i < cardList.length; i++) {
        let cardNode = new cc.Node();
        cardNode.y = landlordCardListNode.y;

        let cardSprite : cc.Sprite = cardNode.addComponent(cc.Sprite);
        cardSprite.spriteFrame = this.cardAtlas.getSpriteFrame(cardList[i].getCode());

        landlordCardListNode.addChild(cardNode);
      }
      landlordCardListNode.active = true;
    }

    public dealUserStartToPlayCardMessage(userId : string) : void {
      if (null == this.roundMO || this.roundMO.thisRoundFinish(this.MAX_USER_COUNT)) {
        this.roundMO = new RoundMO(userId);
      }
      else {
        this.roundMO.setCurrentTurnUserId(userId);
      }

      let seatIndex = this.findUserSeatIndexInUserListByUserId(userId);

      let userNode : cc.Node = this.node.getChildByName(RoomConstant.USER_NODE_NAME_PREFIX + seatIndex);
      let playCardNode : cc.Node = userNode.getChildByName(RoomConstant.PLAY_CARD);
      playCardNode.active = true;
    }

    public changePrepareStatus() : void {
      let oldPrepared : boolean = this.userList[0].getPrepared();
      let userChangePreparedStatusRequest : UserChangePreparedStatusRequest = new UserChangePreparedStatusRequest(!oldPrepared);
      HttpManager.post(userChangePreparedStatusRequest, UrlConstant.ROOM_CHANGE_USER_PREPARE_STATUS);

      this.userList[0].setPrepared(!oldPrepared);
      let userNode : cc.Node = this.node.getChildByName(RoomConstant.USER_NODE_NAME_ME);
      let preparedNode : cc.Node = userNode.getChildByName(RoomConstant.PREPARE_NODE_NAME);
      if (!oldPrepared) {
        preparedNode.children[0].getComponent(cc.Label).string = RoomConstant.PREPARE_NODE_LABEL_YES;
      }
      else {
        preparedNode.children[0].getComponent(cc.Label).string = RoomConstant.PREPARE_NODE_LABEL_NO;
      }
    }

    public doRobLandlord() : void {
      HttpManager.post(null, UrlConstant.ROOM_DO_ROB_LANDLORD);

      let userNode : cc.Node = this.node.getChildByName(RoomConstant.USER_NODE_NAME_ME);
      let robLandlordNode : cc.Node = userNode.getChildByName(RoomConstant.ROB_LANDLORD);
      robLandlordNode.children[1].active = false;
    }

    public doNotRobLandlord() : void {
      HttpManager.post(null, UrlConstant.ROOM_DO_NOT_ROB_LANDLORD);

      let userNode : cc.Node = this.node.getChildByName(RoomConstant.USER_NODE_NAME_ME);
      let robLandlordNode : cc.Node = userNode.getChildByName(RoomConstant.ROB_LANDLORD);
      robLandlordNode.children[0].active = false;
    }

    public leaveThisRoom() : void {
      HttpManager.post(null, UrlConstant.ROOM_LEAVE);
      cc.sys.localStorage.removeItem(LocalStorageConstant.ROOM_ID);
      cc.director.loadScene(SceneConstant.HALL_SCENE_URL, () => {
        console.log('??????????????????');
      });
    }

    public doPlayCard() : void {
      let cardList : Array<Card> = this.getPlayCardList();
      let lastCardList : Array<Card> = this.roundMO.getLastPlayCard();

      if (CardUtil.canNotPlayThisCard(cardList, lastCardList)) {
        return;
      }

      let serverCardNameList : Array<string> = convertClientCardListToServerCardNameList(cardList);
      let userPlayCardRequest : UserPlayCardRequest = new UserPlayCardRequest(serverCardNameList);
      HttpManager.post(userPlayCardRequest, UrlConstant.ROOM_DO_PLAY_CARD);
      this.removePlayCardList();

      let userNode : cc.Node = this.node.getChildByName(RoomConstant.USER_NODE_NAME_ME);
      let robLandlordNode : cc.Node = userNode.getChildByName(RoomConstant.ROB_LANDLORD);
      robLandlordNode.children[1].active = false;
    }

    private getPlayCardList() : Array<Card> {
      let cardCodeList : Array<string> = new Array();
      this.playCardSet.forEach((element : cc.Node) => {
        element.getComponent(cc.Sprite).spriteFrame.name;
        cardCodeList.push(element.getComponent(cc.Sprite).spriteFrame.name);
      });

      return convertCodeListToClientCardList(cardCodeList);
    }

    private removePlayCardList() : void {
      this.playCardSet.forEach((element : cc.Node) => {
        let parentNode : cc.Node = element.getParent();
        parentNode.removeChild(element);
      });
      this.playCardSet.clear();
    }

    public doNotPlayCard() : void {
      HttpManager.post(null, UrlConstant.ROOM_DO_NOT_PLAY_CARD);

      let userNode : cc.Node = this.node.getChildByName(RoomConstant.USER_NODE_NAME_ME);
      let robLandlordNode : cc.Node = userNode.getChildByName(RoomConstant.PLAY_CARD);
      robLandlordNode.children[0].active = false;
    }
}

