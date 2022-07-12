import SceneConstant from "./constant/SceneConstant";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LoginManagerController extends cc.Component {

    start () {

    }

    onRegister() {
      cc.director.loadScene(SceneConstant.REGISTER_SCENE_URL, () => {
        console.log('成功加载注册页');
      });
    }

    onLogin() {

    }

}
