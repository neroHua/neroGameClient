import BaseMessage from "./bean/BaseMessage";
import GameUserMO from "./bean/game/user/GameUserMO";
import HttpResponse from "./bean/http/HttpResponse";
import RoomUserInformationResponse from "./bean/http/user/RoomUserInformationResponse";
import UserChangePreparedStatusRequest from "./bean/http/user/UserChangePreparedStatusRequest";
import WebSocketConfig from "./config/WebSocketConfig";
import LocalStorageConstant from "./constant/LocalStorageConstant";
import UrlConstant from "./constant/UrlConstant";
import UserConvert from "./convert/UserConvert";
import { MessageTypeEnumeration } from "./enumeration/MessageTypeEnumeration";
import HttpManager from "./net/HttpManager";
import WebSocketManager from "./net/WebSocketManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RoomController extends cc.Component {

    private webSocket : WebSocket = null;

    private userList : Array<GameUserMO>;

    private readonly MAX_USER_COUNT : number = 3;

    start () {
      this.initWebSocket();
      this.initUserList();
    }
    private initWebSocket() {
      let userInformationString = cc.sys.localStorage.getItem(LocalStorageConstant.USER_INFORMATION);
      let userInformation = JSON.parse(userInformationString);
  
      this.webSocket = new WebSocket(WebSocketConfig.HTTP_URL_PRE_FIX + userInformation.userId);
  
      let that = this;
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

      console.log(userResponse);
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
        let userNode = this.node.getChildByName("user" + i);
        let userInforMationNode = userNode.getChildByName("userInformation");
        userInforMationNode.getComponent(cc.Label).string = this.userList[i].getUserId();

        let preparedNode = userNode.getChildByName("prepare");
        if (this.userList[i].getPrepared()) {
          preparedNode.children[0].getComponent(cc.Label).string = "取消准备";
        }
        else {
          preparedNode.children[0].getComponent(cc.Label).string = "准备";
        }
      }

      for (; i < this.MAX_USER_COUNT; i++) {
        let userNode = this.node.getChildByName("user" + i);
        userNode.active = false;
      }
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
    }

    public dealUserJoinRoomMessage(userId : string) {
      let seatIndex = this.userList.length;
      let gameUserMO : GameUserMO = new GameUserMO(userId);
      gameUserMO.setPrepared(true);
      this.userList.push(gameUserMO);

      let userNode = this.node.getChildByName("user" + seatIndex);
      let userInforMationNode = userNode.getChildByName("userInformation");
      userInforMationNode.getComponent(cc.Label).string = this.userList[seatIndex].getUserId();

      userNode.active = true;
    }

    public dealChangeUserPrepareStatusMessage(userId : string, prepared : boolean) {
      let gameUserMO : GameUserMO = null;
      let i = 0;
      for (; i < this.userList.length; i++) {
        if (this.userList[i].getUserId() === userId) {
          break;
        }
      }
      gameUserMO = this.userList[i];

      gameUserMO.setPrepared(prepared);
      let userNode = this.node.getChildByName("user" + i);
      let preparedNode = userNode.getChildByName("prepare");
      if (this.userList[i].getPrepared()) {
        preparedNode.children[0].getComponent(cc.Label).string = "取消准备";
      }
      else {
        preparedNode.children[0].getComponent(cc.Label).string = "准备";
      }
    }

    public changePrepareStatus() : void {
      let oldPrepared : boolean = this.userList[0].getPrepared();
      let userChangePreparedStatusRequest : UserChangePreparedStatusRequest = new UserChangePreparedStatusRequest(!oldPrepared);
      HttpManager.post(userChangePreparedStatusRequest, UrlConstant.ROOM_CHANGE_USER_PREPARE_STATUS);

      this.userList[0].setPrepared(!oldPrepared);
      let userNode = this.node.getChildByName("user0");
      let preparedNode : cc.Node = userNode.getChildByName('prepare');
      if (!oldPrepared) {
        preparedNode.children[0].getComponent(cc.Label).string = "取消准备";
      }
      else {
        preparedNode.children[0].getComponent(cc.Label).string = "准备";
      }
    }

}
