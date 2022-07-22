import UserChangePreparedStatusRequest from "./bean/http/user/UserChangePreparedStatusRequest";
import UrlConstant from "./constant/UrlConstant";
import HttpManager from "./net/HttpManager";
import WebSocketManager from "./net/WebSocketManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RoomController extends cc.Component {

    @property(cc.Node)
    private prepareButton: cc.Node = null;

    private prepareStatus : boolean = null;

    private webSocketManager : WebSocketManager = null;

    start () {
      this.webSocketManager = new WebSocketManager();
      this.webSocketManager.init(this.onOpen, this.onClose, this.onError, this.onMessage);
      this.prepareStatus = true;
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
      console.log(message, '获得消息');
    }

    public changePrepareStatus() : void {
      this.prepareStatus = !this.prepareStatus;
      let userChangePreparedStatusRequest : UserChangePreparedStatusRequest = new UserChangePreparedStatusRequest(this.prepareStatus);
      HttpManager.post(userChangePreparedStatusRequest, UrlConstant.ROOM_CHANGE_USER_PREPARE_STATUS);

      let prepareNode : cc.Node = this.node.getChildByName('prepare');
      if (this.prepareStatus) {
        prepareNode.children[0].getComponent(cc.Label).string = "取消准备";
      }
      else {
        prepareNode.children[0].getComponent(cc.Label).string = "准备";
      }

    }

}
