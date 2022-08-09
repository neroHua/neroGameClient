import Card, { CardEnumeration } from "../../enumeration/CardEnumeration";
import PlayCardType, { PlayCardTypeEnumeration } from "../../enumeration/PlayCardTypeEnumeration";
import PlayCardTypeValidate from "../PlayCardTypeValidate";

export default class SingleValidate implements PlayCardTypeValidate {

  private readonly COUNT : number = 1;

  getPlayCardTypeEnumeration(): PlayCardType {
    return PlayCardTypeEnumeration.SINGLE;
  }

  match(cardEnumerationList: Array<Card>): boolean {
    return this.COUNT === cardEnumerationList.length;
  }

}
