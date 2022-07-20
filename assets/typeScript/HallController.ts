import HttpResponse from "./bean/http/HttpResponse";
import JoinRequest from "./bean/http/room/JoinRequest";
import LocalStorageConstant from "./constant/LocalStorageConstant";
import SceneConstant from "./constant/SceneConstant";
import UrlConstant from "./constant/UrlConstant";
import HttpManager from "./net/HttpManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HallController extends cc.Component {

    start () {

    }

    onCreateRoom() {
      let roomIdResponse : HttpResponse<number> = HttpManager.post(null, UrlConstant.ROOM_CREATE);

      cc.sys.localStorage.setItem(LocalStorageConstant.ROOM_ID, roomIdResponse.data);

      let joinRequest = new JoinRequest(roomIdResponse.data);
      let ROOMJoinResponse : HttpResponse<boolean> = HttpManager.post(joinRequest, UrlConstant.ROOM_JOIN);
      cc.director.loadScene(SceneConstant.ROOM_SCENE_URL, () => {
        console.log('加载房间成功');
      });
    }

    onJoinRoom() {

    }
}
