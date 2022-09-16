import Card from "../../../enumeration/CardEnumeration";

export default class GameUserMO {

  private userId : string;
  private prepared : boolean;
  private cardList : Array<Card>; 

  private score : number;

  constructor(userId : string) {
    this.userId = userId;
  }

  public getUserId() : string {
    return this.userId;
  }

  public setUserId(userId : string) : void {
    this.userId = userId;
  }

  public getPrepared() : boolean {
    return this.prepared;
  }

  public setPrepared(prepared : boolean) : void {
    this.prepared = prepared;
  }

  public getCardList() : Array<Card> {
    return this.cardList;
  }

  public setCardList(cardList : Array<Card>) : void {
    this.cardList = cardList;
  }

  public getScore() : number {
    return this.score;
  }

  public setScore(score : number) : void {
    this.score = score;
  }

  public clean() : void {
    this.prepared = false;
    this.cardList = null;
    this.score = 0;
  }

}
