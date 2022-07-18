import HttpResponse from "./bean/http/HttpResponse";
import LoginRequest from "./bean/http/LoginRequest";
import UserInformationResponse from "./bean/http/UserInformationResponse";
import LocalStorageConstant from "./constant/LocalStorageConstant";
import SceneConstant from "./constant/SceneConstant";
import UrlConstant from "./constant/UrlConstant";
import HttpManager from "./net/HttpManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LoginController extends cc.Component {

    onLoad () {

    }

    start () {
      let registerMessageString : string = cc.sys.localStorage.getItem(LocalStorageConstant.REGISTER_INFORMATION);
      if (null!= registerMessageString) {
        let childrenNodeList = this.node.getParent().children;
        const registerMessage = JSON.parse(registerMessageString);
        console.log(registerMessage, childrenNodeList)

        childrenNodeList[0].getComponent(cc.EditBox).string = registerMessage.userId;
        childrenNodeList[1].getComponent(cc.EditBox).string = registerMessage.password;
        cc.sys.localStorage.removeItem(LocalStorageConstant.REGISTER_INFORMATION);
      }
    }

    onLogin() {
      let parent = this.node.getParent();
      let childrenNode = parent.children;

      let loginRequest = new LoginRequest(childrenNode[0].getComponent(cc.EditBox).string, childrenNode[1].getComponent(cc.EditBox).string);

      let token: HttpResponse<string> = HttpManager.post(loginRequest, UrlConstant.LOGIN_URL);
      cc.sys.localStorage.setItem(LocalStorageConstant.TOKEN, token.data);

      let userInformationResponse : HttpResponse<UserInformationResponse> = HttpManager.get(null, UrlConstant.USER_INFORMATION);

      cc.sys.localStorage.setItem(LocalStorageConstant.USER_INFORMATION, JSON.stringify(userInformationResponse));

      cc.director.loadScene(SceneConstant.HALL_SCENE_URL, () => {
        console.log('加载大厅成功');
      });
    }

}
