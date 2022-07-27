export default class MessageType {

  private readonly serverMessageName : string;

  private readonly code : string;
  
  private readonly message: string;

  constructor (serverMessageName : string, code : string, message : string) {
    this.serverMessageName= serverMessageName;
    this.code = code;
    this.message = message;
  }

  public getServerMessageName() : string {
    return this.serverMessageName;
  }

  public getCode() : string {
    return this.code;
  }

  public getMessage() : string {
    return this.message;
  }

}

export const MessageTypeEnumeration = { 
  USER_JOIN_ROOM: new MessageType("USER_JOIN_ROOM", "userJoinRoom", "用户加入房间"),
  USER_LEAVE_ROOM: new MessageType("USER_LEAVE_ROOM", "userLeaveRoom", "用户离开房间"),
  CHANGE_USER_PREPARE_STATUS: new MessageType("CHANGE_USER_PREPARE_STATUS", "changeUserPrepareStatus", "用户改变准备状态"),
  DEAL_CARD: new MessageType("DEAL_CARD", "dealCard", "发牌"),
  USER_START_ROB_LANDLORD : new MessageType("USER_START_ROB_LANDLORD", "userStartRobLandlord", "用户开始抢地主消息"),
  USER_DO_ROB_LANDLORD : new MessageType("USER_DO_ROB_LANDLORD", "userDoRobLandlord", "用户抢地主消息"),
  USER_DO_NOT_ROB_LANDLORD : new MessageType("USER_DO_NOT_ROB_LANDLORD", "userDoNotRobLandlord", "用户不抢地主消息"),
  DEAL_LANDLORD_CARD : new MessageType("DEAL_LANDLORD_CARD", "dealLandlordCard", "发地主牌"),
}
