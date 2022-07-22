import { MessageTypeEnumeration } from "../../../enumeration/MessageTypeEnumeration";
import BaseMessage from "../../BaseMessage";

export default class ChangeUserPrepareStatusMessage extends BaseMessage {

  private userId : string;

  private prepared : boolean;

  constructor(userId : string, prepared : boolean) {
    super(MessageTypeEnumeration.CHANGE_USER_PREPARE_STATUS);
    this.userId = userId;
    this.prepared = prepared;
  }

  public getUserId() : string {
    return this.userId;
  }

  public getPrepared() : boolean {
    return this.prepared;
  }

}
