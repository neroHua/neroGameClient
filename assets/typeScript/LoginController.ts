import LoginRequest from "./bean/http/LoginRequest";
import LocalStorageConstant from "./constant/LocalStorageConstant";
import SceneConstant from "./constant/SceneConstant";
import UrlConstant from "./constant/UrlConstant";
import HttpManager from "./net/HttpManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LoginController extends cc.Component {

    onLoad () {
      let registerMessage = cc.sys.localStorage.getItem(LocalStorageConstant.REGISTER_INFORMATION);
      if (null!= registerMessage) {
        let childrenNodeList = this.node.children;
        childrenNodeList[0].getComponent(cc.EditBox).string = registerMessage.userId;
        childrenNodeList[1].getComponent(cc.EditBox).string = registerMessage.password;
        cc.sys.localStorage.removeItem(LocalStorageConstant.REGISTER_INFORMATION);
      }
    }

    start () {

    }

    onLogin() {
      let parent = this.node.getParent();
      let childrenNode = parent.children;

      let loginMessage = new LoginRequest(childrenNode[0].getComponent(cc.EditBox).string, childrenNode[1].getComponent(cc.EditBox).string);

      let userInformation = HttpManager.post(loginMessage, UrlConstant.LOGIN_URL);

      cc.sys.localStorage.setItem(LocalStorageConstant.USER_INFORMATION, userInformation);

      cc.director.loadScene(SceneConstant.HALL_SCENE_URL, () => {
        console.log('加载登录成功');
      });
    }

}
