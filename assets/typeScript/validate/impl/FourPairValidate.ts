import Card, { CardEnumeration } from "../../enumeration/CardEnumeration";
import PlayCardType, { PlayCardTypeEnumeration } from "../../enumeration/PlayCardTypeEnumeration";
import PlayCardTypeValidate from "../PlayCardTypeValidate";

export default class FourPairValidate implements PlayCardTypeValidate {

  private readonly COUNT : number = 8;

  getPlayCardTypeEnumeration(): PlayCardType {
    return PlayCardTypeEnumeration.FOUR_PAIR;
  }

  match(cardEnumerationList: Array<Card>): boolean {
    if (this.COUNT != cardEnumerationList.length) {
      return false;
    }

    return cardEnumerationList[0].getValue() === cardEnumerationList[1].getValue()
      && cardEnumerationList[1].getValue() === cardEnumerationList[2].getValue()
      && cardEnumerationList[2].getValue() === cardEnumerationList[3].getValue()
      && cardEnumerationList[4].getValue() === cardEnumerationList[5].getValue()
      && cardEnumerationList[6].getValue() === cardEnumerationList[7].getValue();
  }

}
