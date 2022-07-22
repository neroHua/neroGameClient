import MessageType from "../enumeration/MessageTypeEnumeration";

export default class BaseMessage {

  private messageTypeEnumeration : MessageType;

  constructor(messageTypeEnumeration : MessageType) {
    this.messageTypeEnumeration = messageTypeEnumeration;
  }

}
