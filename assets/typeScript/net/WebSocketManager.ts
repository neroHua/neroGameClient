import WebSocketConfig from "../config/WebSocketConfig";
import LocalStorageConstant from "../constant/LocalStorageConstant";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WebSocketManager extends cc.Component {

  private static webSocket : WebSocket = null;

  public static init() {
    let userInformationString = cc.sys.localStorage.getItem(LocalStorageConstant.USER_INFORMATION);
    let userInformation = JSON.parse(userInformationString);
    console.log(userInformationString);
    console.log(userInformation, userInformationString);

    this.webSocket = new WebSocket(WebSocketConfig.HTTP_URL_PRE_FIX + userInformation.userId);

    this.webSocket.onopen = this.onOpen;
    this.webSocket.onclose= this.onClose;
    this.webSocket.onerror= this.onError;
    this.webSocket.onmessage= this.onMessage;
  }

  private static onOpen() {
    console.log('链接成功');
  }

  private static onClose() {
    console.log('链接关闭');
  }

  private static onError() {
    console.log('链接出错');
  }
  public static onMessage(message) {
    console.log(message, '获得消息');
  }

  public static sendMessage(message : string) {
    this.webSocket.send(message);
  }

}
