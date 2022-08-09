import Card, { CardEnumeration } from "../../enumeration/CardEnumeration";
import PlayCardType, { PlayCardTypeEnumeration } from "../../enumeration/PlayCardTypeEnumeration";
import PlayCardTypeValidate from "../PlayCardTypeValidate";

export default class AirplanePairValidate implements PlayCardTypeValidate {

  private readonly MIN_COUNT : number = 10;
  private readonly GROUP_COUNT : number = 5;
  private readonly TRIPLE_COUNT : number = 3;

  getPlayCardTypeEnumeration() {
    return PlayCardTypeEnumeration.AIRPLANE_PAIR;
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

    for (let i = 0; i < cardEnumerationList.length / this.GROUP_COUNT; i += 3) {
        if (cardEnumerationList[i].getValue() - 1 != cardEnumerationList[i + 3].getValue()) {
            return false;
        }
    }

    if (cardEnumerationList[0].getValue() >= CardEnumeration.CARD_415.getValue()) {
        return false;
    }

    let lastTripleStartIndex : number = this.calculateLastTripleStartIndex(cardEnumerationList.length);
    for (let i = lastTripleStartIndex + 3; i < cardEnumerationList.length; i += 2) {
        if (cardEnumerationList[i].getValue() != cardEnumerationList[i + 1].getValue()) {
            return false;
        }
    }

    return true;
  }


  private calculateLastTripleStartIndex(size : number) : number {
    return (size / this.GROUP_COUNT - 1) * this.TRIPLE_COUNT;
  }

}
