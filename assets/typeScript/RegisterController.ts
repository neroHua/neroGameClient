import RegisterRequest from "./bean/http/RegisterRequest";
import UrlConstant from "./constant/UrlConstant";
import HttpManager from "./net/HttpManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RegisterController extends cc.Component {

    start () {
    }

    onUserIdDidEnd(editBox: cc.EditBox, customerEventData) {
      console.log(editBox.string, customerEventData);
    }

    onPassword1DidEnd(editBox: cc.EditBox, customerEventData) {
      console.log(editBox.string, customerEventData);
    }

    onPassword2DidEnd(editBox: cc.EditBox, customerEventData) {
      console.log(editBox.string, customerEventData);
    }
    
    onNickNameDidEnd(editBox: cc.EditBox, customerEventData) {
      console.log(editBox.string, customerEventData);
    }

    onRegisterDidEnd() {
      let parent = this.node.getParent();
      let childrenNode = parent.children;

      for (let i = 0; i < 4; i++) {
        childrenNode[i].getComponent(cc.EditBox).string;
      }

      let loginMessage = new RegisterRequest(childrenNode[0].getComponent(cc.EditBox).string, childrenNode[1].getComponent(cc.EditBox).string, childrenNode[2].getComponent(cc.EditBox).string);

      HttpManager.post(loginMessage, UrlConstant.REGISTER_URL);

      console.log(loginMessage, this);
    }

}
