import Card from "../../../enumeration/CardEnumeration";

export default class RoundMO {

  private currentTurnUserId : string ;

  private palyCardList : Array<Array<Card>> = new Array();

  constructor(currentTurnUserId : string) {
    this.currentTurnUserId = currentTurnUserId;
  }

  public getCurrentTurnUserId() : string {
    return this.currentTurnUserId;
  }

  public setCurrentTurnUserId(currentTurnUserId : string) : void {
    this.currentTurnUserId = currentTurnUserId;
  }

  public doPlayCard(cardList : Array<Card>) : void {
    this.palyCardList.push(cardList);
  }

  public doNotPlayCard() : void {
    this.palyCardList.push(null);
  }

  public thisRoundFinish(maxUserCount : number) : boolean {
    if (this.palyCardList.length < maxUserCount) {
      return false;
    }

    for (let i = 0; i < maxUserCount - 1; i++) {
      if (null == this.palyCardList[this.palyCardList.length - 1 - i]) {
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

}
