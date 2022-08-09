import Card, { CardEnumeration } from "../../enumeration/CardEnumeration";
import PlayCardType, { PlayCardTypeEnumeration } from "../../enumeration/PlayCardTypeEnumeration";
import PlayCardTypeValidate from "../PlayCardTypeValidate";

export default class PairStraightValidate implements PlayCardTypeValidate {

  private readonly MIN_COUNT : number = 6;
  private readonly GROUP_COUNT : number = 2;

  getPlayCardTypeEnumeration(): PlayCardType {
    return PlayCardTypeEnumeration.PAIR_STRAIGHT;
  }

  match(cardEnumerationList: Array<Card>): boolean {
    if (cardEnumerationList.length < this.MIN_COUNT) {
      return false;
    }

    if (0 != cardEnumerationList.length % this.GROUP_COUNT) {
      return false;
    }

    for (let i : number = 0; i < cardEnumerationList.length / this.GROUP_COUNT; i += 2) {
        if (cardEnumerationList[i].getValue() != cardEnumerationList[i + 1].getValue()) {
            return false;
        }
    }

    for (let i = 0; i < cardEnumerationList.length / this.GROUP_COUNT; i += 2) {
        if (cardEnumerationList[i].getValue() - 1 != cardEnumerationList[i + 2].getValue()) {
            return false;
        }
    }

    if (cardEnumerationList[0].getValue() >= CardEnumeration.CARD_415.getValue()) {
        return false;
    }

    return true;
  }

}
