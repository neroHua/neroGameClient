import Card, { CardEnumeration } from "../../enumeration/CardEnumeration";
import PlayCardType, { PlayCardTypeEnumeration } from "../../enumeration/PlayCardTypeEnumeration";
import PlayCardTypeValidate from "../PlayCardTypeValidate";

export default class AirplaneSingleValidate implements PlayCardTypeValidate {

  private readonly MIN_COUNT : number = 8;
  private readonly GROUP_COUNT : number = 4;

  getPlayCardTypeEnumeration(): PlayCardType {
    return PlayCardTypeEnumeration.AIRPLANE_SINGLE;
  }

  match(cardEnumerationList: Array<Card>): boolean {
    if (cardEnumerationList.length < this.MIN_COUNT) {
      return false;
    }

    if (0 != cardEnumerationList.length % this.GROUP_COUNT) {
      return false;
    }

    for (let i : number = 0; i < cardEnumerationList.length / this.GROUP_COUNT; i += 3) {
      if (cardEnumerationList[i].getValue() != cardEnumerationList[i + 1].getValue()
          || cardEnumerationList[i + 1].getValue() != cardEnumerationList[i + 2].getValue()) {
        return false;
      }
    }

    for (let i : number = 0; i < cardEnumerationList.length / this.GROUP_COUNT; i += 3) {
      if (cardEnumerationList[i].getValue() - 1 != cardEnumerationList[i + 3].getValue()) {
        return false;
      }
    }

    if (cardEnumerationList[0].getValue() >= CardEnumeration.CARD_415.getValue()) {
      return false;
    }

    return true;
  }

}
