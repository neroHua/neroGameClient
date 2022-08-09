import Card, { CardEnumeration } from "../../enumeration/CardEnumeration";
import PlayCardType, { PlayCardTypeEnumeration } from "../../enumeration/PlayCardTypeEnumeration";
import PlayCardTypeValidate from "../PlayCardTypeValidate";

export default class StraightValidate implements PlayCardTypeValidate {

  private readonly MIN_COUNT : number = 5;

  getPlayCardTypeEnumeration(): PlayCardType {
    return PlayCardTypeEnumeration.STRAIGHT;
  }

  match(cardEnumerationList: Array<Card>): boolean {
    if (cardEnumerationList.length < this.MIN_COUNT) {
      return false;
    }

    for (let i : number = 1; i < cardEnumerationList.length; i++) {
      if (cardEnumerationList[i].getValue() + 1 != cardEnumerationList[i - 1].getValue()) {
          return false;
      }
    }

    if (cardEnumerationList[0].getValue() >= CardEnumeration.CARD_415.getValue()) {
      return false;
    }

    return true;
  }

}
