import HttpResponse from "./bean/http/HttpResponse";
import RegisterRequest from "./bean/http/RegisterRequest";
import LocalStorageConstant from "./constant/LocalStorageConstant";
import SceneConstant from "./constant/SceneConstant";
import UrlConstant from "./constant/UrlConstant";
import HttpManager from "./net/HttpManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RegisterController extends cc.Component {

    start () {
    }

    onUserIdDidEnd(editBox: cc.EditBox, customerEventData) {
    }

    onPassword1DidEnd(editBox: cc.EditBox, customerEventData) {
    }

    onPassword2DidEnd(editBox: cc.EditBox, customerEventData) {
    }
    
    onNickNameDidEnd(editBox: cc.EditBox, customerEventData) {
    }

    onRegisterDidEnd() {
      let parent = this.node.getParent();
      let childrenNode = parent.children;

      let registerMessage = new RegisterRequest(childrenNode[0].getComponent(cc.EditBox).string, childrenNode[1].getComponent(cc.EditBox).string, childrenNode[2].getComponent(cc.EditBox).string);

      let result : HttpResponse<boolean> = HttpManager.post(registerMessage, UrlConstant.REGISTER_URL);
      console.log(result);

      if (!result.success) {
        console.log('登录失败', result.errorMessage);
        return;
      }

      cc.sys.localStorage.setItem(LocalStorageConstant.REGISTER_INFORMATION, JSON.stringify(registerMessage));

      cc.director.loadScene(SceneConstant.LOGIN_SCENE_URL, () => {
        console.log('加载登录成功');
      });
    }

}
