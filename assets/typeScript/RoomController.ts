import GameUserMO from "./bean/game/user/GameUserMO";
import HttpResponse from "./bean/http/HttpResponse";
import RoomUserInformationResponse from "./bean/http/user/RoomUserInformationResponse";
import UserChangePreparedStatusRequest from "./bean/http/user/UserChangePreparedStatusRequest";
import LocalStorageConstant from "./constant/LocalStorageConstant";
import UrlConstant from "./constant/UrlConstant";
import UserConvert from "./convert/UserConvert";
import HttpManager from "./net/HttpManager";
import WebSocketManager from "./net/WebSocketManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RoomController extends cc.Component {

    private webSocketManager : WebSocketManager = null;

    private userList : Array<GameUserMO>;

    private readonly MAX_USER_COUNT : number = 3;

    start () {
      this.webSocketManager = new WebSocketManager();
      this.webSocketManager.init(this.onOpen, this.onClose, this.onError, this.onMessage);

      this.initUserList();
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
        if (this.userList[i].getPrepared) {
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
