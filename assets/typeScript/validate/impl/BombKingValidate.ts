import CardEnumeration from "../../enumeration/CardEnumeration";
import PlayCardType from "../../enumeration/PlayCardTypeEnumeration";
import PlayCardTypeEnumeration from "../../enumeration/PlayCardTypeEnumeration";
import PlayCardTypeValidate from "../PlayCardTypeValidate";

export default class BombKingValidate implements PlayCardTypeValidate {

  private readonly COUNT : number = 2;

  getPlayCardTypeEnumeration(): PlayCardType {
    return PlayCardTypeEnumeration['BOMB_KING'];
  }

  match(cardEnumerationList: Array<CardEnumeration>): boolean {
    if (this.COUNT != cardEnumerationList.length) {
      return false;
    }

    return cardEnumerationList[0].getValue() === CardEnumeration['CARD_516'].getValue()
      && cardEnumerationList[1].getValue() === CardEnumeration['CARD_517'].getValue();
  }

}
