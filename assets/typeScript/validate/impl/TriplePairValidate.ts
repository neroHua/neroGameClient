import CardEnumeration from "../../enumeration/CardEnumeration";
import PlayCardType from "../../enumeration/PlayCardTypeEnumeration";
import PlayCardTypeEnumeration from "../../enumeration/PlayCardTypeEnumeration";
import PlayCardTypeValidate from "../PlayCardTypeValidate";

export default class TriplePairValidate implements PlayCardTypeValidate {

  private readonly COUNT : number = 5;

  getPlayCardTypeEnumeration(): PlayCardType {
    return PlayCardTypeEnumeration['TRIPLE_PAIR'];
  }

  match(cardEnumerationList: Array<CardEnumeration>): boolean {
    if (this.COUNT != cardEnumerationList.length) {
      return false;
    }

    return cardEnumerationList[0].getValue() === cardEnumerationList[1].getValue()
      && cardEnumerationList[1].getValue() === cardEnumerationList[2].getValue()
      && cardEnumerationList[3].getValue() === cardEnumerationList[4].getValue();
  }

}
