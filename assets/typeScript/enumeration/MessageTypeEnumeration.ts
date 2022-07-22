export default class MessageType {

  private readonly serverMessageName : string;

  private readonly code : string;
  
  private readonly message: string;

  constructor (serverMessageName : string, code : string, message : string) {
    this.serverMessageName= serverMessageName;
    this.code = code;
    this.message = message;
  }

  private getServerMessageName() : string {
    return this.serverMessageName;
  }

  private getCode() : string {
    return this.code;
  }

  private getMessage() : string {
    return this.message;
  }

}

export const MessageTypeEnumeration = { 
  CHANGE_USER_PREPARE_STATUS: new MessageType("CHANGE_USER_PREPARE_STATUS", "changeUserPrepareStatus", "用户改变准备状态"),
  DEAL_CARD: new MessageType("DEAL_CARD", "dealCard", "发牌"),
}
