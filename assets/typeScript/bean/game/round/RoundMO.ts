import Card from "../../../enumeration/CardEnumeration";
import PlayCardType from "../../../enumeration/PlayCardTypeEnumeration";

export default class RoundMO {

  private currentTurnUserId : string ;

  private palyCardList : Array<Array<Card>> = new Array();

  private palyCardTypeList : Array<PlayCardType> = new Array();

  constructor(currentTurnUserId : string) {
    this.currentTurnUserId = currentTurnUserId;
  }

  public getCurrentTurnUserId() : string {
    return this.currentTurnUserId;
  }

  public setCurrentTurnUserId(currentTurnUserId : string) : void {
    this.currentTurnUserId = currentTurnUserId;
  }

  public doPlayCard(cardList : Array<Card>, playCardType : PlayCardType) : void {
    this.palyCardList.push(cardList);
    this.palyCardTypeList.push(playCardType);
  }

  public doNotPlayCard() : void {
    this.palyCardList.push(null);
    this.palyCardTypeList.push(null);
  }

  public thisRoundFinish(maxUserCount : number) : boolean {
    if (this.palyCardList.length < maxUserCount) {
      return false;
    }

    for (let i : number = 0, j : number = this.palyCardList.length - 1; i < maxUserCount - 1; i++, j--) {
      if (null !== this.palyCardList[j]) {
          return false;
      }
    }

    return true;
  }

  public getLastPlayCard() : Array<Card> {
    if (null == this.palyCardList) {
      return null;
    }

    for (let i = this.palyCardList.length; i >= 0; i--) {
      if (null != this.palyCardList[i]) {
        return this.palyCardList[i];
      }
    }

    return null;
  }

  public getLastPlayCardType() : PlayCardType {
    if (null == this.palyCardTypeList) {
      return null;
    }

    for (let i = this.palyCardTypeList.length; i >= 0; i--) {
      if (null != this.palyCardTypeList[i]) {
        return this.palyCardTypeList[i];
      }
    }

    return null;
  }

}
