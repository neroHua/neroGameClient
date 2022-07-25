import { MessageTypeEnumeration } from "../../../enumeration/MessageTypeEnumeration";
import BaseMessage from "../../BaseMessage";

export default class UserJoinRoomMessage extends BaseMessage {

  private userId : string;

  constructor(userId : string) {
    super(MessageTypeEnumeration.USER_JOIN_ROOM);
    this.userId = userId;
  }

  public getUserId() : string {
    return this.userId;
  }

}
