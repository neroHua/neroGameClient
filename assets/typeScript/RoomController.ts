import WebSocketManager from "./net/WebSocketManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RoomController extends cc.Component {

    @property(cc.Node)
    private prepareButton: cc.Node = null;

    private prepareStatus : boolean = null;

    start () {
      WebSocketManager.init();
      this.prepareStatus = true;
    }

    public changePrepareStatus() : void {
      this.prepareStatus = !this.prepareStatus;
      WebSocketManager.sendMessage("change the status");

      let prepareNode : cc.Node = this.node.getChildByName('prepare');
      if (this.prepareStatus) {
        prepareNode.children[0].getComponent(cc.Label).string = "取消准备";
      }
      else {
        prepareNode.children[0].getComponent(cc.Label).string = "准备";
      }
    }

}
