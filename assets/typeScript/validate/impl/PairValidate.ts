import Card, { CardEnumeration } from "../../enumeration/CardEnumeration";
import PlayCardType, { PlayCardTypeEnumeration } from "../../enumeration/PlayCardTypeEnumeration";
import PlayCardTypeValidate from "../PlayCardTypeValidate";

export default class PairValidate implements PlayCardTypeValidate {

  private readonly COUNT : number = 2;

  getPlayCardTypeEnumeration(): PlayCardType {
    return PlayCardTypeEnumeration.PAIR;
  }

  match(cardEnumerationList: Array<Card>): boolean {
    if (this.COUNT != cardEnumerationList.length) {
      return false;
    }

    return cardEnumerationList[0].getValue() === cardEnumerationList[1].getValue();
  }

}
