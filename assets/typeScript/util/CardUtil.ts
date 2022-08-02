import Card, { CardEnumeration } from "../enumeration/CardEnumeration";

export default class CardUtil {
  public static sortOneCardList(start : number, end : number, cardList : Array<Card>) : void {
    if (start >= end) {
        return;
    }

    let keyCard : Card = cardList[start];
    let i : number = start;
    let j : number = end;
    while (i != j) {
        if (cardList[i].getValue() < keyCard.getValue()) {
            let temp : Card = cardList[j];
            cardList[j] = cardList[i];
            cardList[i] = temp;
            j--;
        }
        else {
           i++;
        }
    }

    let middle : number = cardList[i].getValue() >= keyCard.getValue() ? i : i - 1;
    if (middle >= start && middle <= end) {
        let temp : Card = cardList[middle];
        cardList[middle] = cardList[start];
        cardList[start] = temp;
    }

    this.sortOneCardList(start, middle - 1, cardList);
    this.sortOneCardList(middle + 1, end, cardList);
  }

  public static generateOtherUserCard(cardList : Array<Card>) : Array<Card> {
    let otherUserCard : Array<Card> = new Array<Card>();
    for (let i = 0; i < cardList.length; i++) {
      otherUserCard.push(CardEnumeration.CARD_500);
    }
    return otherUserCard;
  }

  public static canNotPlayThisCard(cardList: Card[], lastCardList: Card[]) : boolean {
    return false;
  }

}
