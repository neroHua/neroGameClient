import WebSocketConfig from "../config/WebSocketConfig";
import LocalStorageConstant from "../constant/LocalStorageConstant";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WebSocketManager extends cc.Component {

  private webSocket : WebSocket = null;

  public init(onOpen, onClose, onError, onMessage) {
    let userInformationString = cc.sys.localStorage.getItem(LocalStorageConstant.USER_INFORMATION);
    let userInformation = JSON.parse(userInformationString);
    console.log(userInformationString);
    console.log(userInformation, userInformationString);

    this.webSocket = new WebSocket(WebSocketConfig.HTTP_URL_PRE_FIX + userInformation.userId);

    this.webSocket.onopen = onOpen;
    this.webSocket.onclose = onClose;
    this.webSocket.onerror = onError;
    this.webSocket.onmessage = onMessage;
  }

  public sendMessage(message : string) {
    this.webSocket.send(message);
  }

}
