import Card, { CardEnumeration } from "../../enumeration/CardEnumeration";
import PlayCardType, { PlayCardTypeEnumeration } from "../../enumeration/PlayCardTypeEnumeration";
import PlayCardTypeValidate from "../PlayCardTypeValidate";

export default class BombValidate implements PlayCardTypeValidate {

  private readonly COUNT : number = 4;

  getPlayCardTypeEnumeration(): PlayCardType {
    return PlayCardTypeEnumeration.BOMB;
  }

  match(cardEnumerationList: Array<Card>): boolean {
    if (this.COUNT != cardEnumerationList.length) {
      return false;
    }

    return cardEnumerationList[0].getValue() === cardEnumerationList[1].getValue()
      && cardEnumerationList[1].getValue() === cardEnumerationList[2].getValue()
      && cardEnumerationList[2].getValue() === cardEnumerationList[3].getValue();
  }

}
