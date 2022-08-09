import Card from "../enumeration/CardEnumeration";
import PlayCardType from "../enumeration/PlayCardTypeEnumeration";

export default interface PlayCardTypeValidate {

  getPlayCardTypeEnumeration() : PlayCardType;

  match(cardEnumerationList : Array<Card>) : boolean;

}
