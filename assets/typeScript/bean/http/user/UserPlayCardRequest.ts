export default class UserPlayCardRequest {

  private cardEnumerationList : Array<string>;

  private  playCardTypeEnumeration : string;

  constructor(cardEnumerationList : Array<string>, playCardTypeEnumeration : string) {
    this.cardEnumerationList = cardEnumerationList;
    this.playCardTypeEnumeration = playCardTypeEnumeration;
  }

}
