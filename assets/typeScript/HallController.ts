import HttpResponse from "./bean/http/HttpResponse";
import CreateRequest from "./bean/http/room/CreateRequest";
import JoinRequest from "./bean/http/room/JoinRequest";
import LocalStorageConstant from "./constant/LocalStorageConstant";
import SceneConstant from "./constant/SceneConstant";
import UrlConstant from "./constant/UrlConstant";
import { GameTypeEnumeration } from "./enumeration/GameTypeEnumeration";
import HttpManager from "./net/HttpManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HallController extends cc.Component {

    @property(cc.Node)
    private createRoomButton: cc.Node = null;

    @property(cc.Node)
    private joinRoomButton: cc.Node = null;

    @property(cc.Node)
    private joinRoomEditBox: cc.Node = null;

    start () {
      this.joinRoomEditBox.active = false;
    }

    onCreateRoom() {
      let createRoomRequest = new CreateRequest(GameTypeEnumeration.FIGHT_LANDLORD_FOR_THREE);
      let roomIdResponse : HttpResponse<number> = HttpManager.post(createRoomRequest, UrlConstant.ROOM_CREATE);

      cc.sys.localStorage.setItem(LocalStorageConstant.ROOM_ID, roomIdResponse.data);

      let joinRequest = new JoinRequest(roomIdResponse.data);
      let ROOMJoinResponse : HttpResponse<boolean> = HttpManager.post(joinRequest, UrlConstant.ROOM_JOIN);
      cc.director.loadScene(SceneConstant.ROOM_SCENE_URL, () => {
        console.log('加载房间成功');
      });
    }

    onJoinRoom() {
      this.joinRoomEditBox.active = true;
    }

    onInputJoinRoomIdEnd(editBox : cc.EditBox, customEventData : string) {
      let roomId = this.joinRoomEditBox.getComponent(cc.EditBox).string;
      cc.sys.localStorage.setItem(LocalStorageConstant.ROOM_ID, roomId);

      let joinRequest = new JoinRequest(Number.parseInt(roomId));
      let ROOMJoinResponse : HttpResponse<boolean> = HttpManager.post(joinRequest, UrlConstant.ROOM_JOIN);

      cc.director.loadScene(SceneConstant.ROOM_SCENE_URL, () => {
        console.log('加载房间成功');
      });
    }

}
