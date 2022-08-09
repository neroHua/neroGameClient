import CardEnumeration from "../../enumeration/CardEnumeration";
import PlayCardType from "../../enumeration/PlayCardTypeEnumeration";
import PlayCardTypeEnumeration from "../../enumeration/PlayCardTypeEnumeration";
import PlayCardTypeValidate from "../PlayCardTypeValidate";

export default class TripleSingleValidate implements PlayCardTypeValidate {

  private readonly COUNT : number = 4;

  getPlayCardTypeEnumeration(): PlayCardType {
    return PlayCardTypeEnumeration['TRIPLE_SINGLE'];
  }

  match(cardEnumerationList: Array<CardEnumeration>): boolean {
    if (this.COUNT != cardEnumerationList.length) {
      return false;
    }

    return cardEnumerationList[0].getValue() === cardEnumerationList[1].getValue()
      && cardEnumerationList[1].getValue() === cardEnumerationList[2].getValue();
  }

}
