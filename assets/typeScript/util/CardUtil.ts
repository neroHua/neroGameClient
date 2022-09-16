import Card, { CardEnumeration } from "../enumeration/CardEnumeration";
import PlayCardType, { PlayCardTypeEnumeration } from "../enumeration/PlayCardTypeEnumeration";
import AirplanePairValidate from "../validate/impl/AirplanePairValidate";
import AirplaneSingleValidate from "../validate/impl/AirplaneSingleValidate";
import AirplaneValidate from "../validate/impl/AirplaneValidate";
import BombKingValidate from "../validate/impl/BombKingValidate";
import BombValidate from "../validate/impl/BombValidate";
import FourPairValidate from "../validate/impl/FourPairValidate";
import FourSingleValidate from "../validate/impl/FourSingleValidate";
import PairStraightValidate from "../validate/impl/PairStraightValidate";
import PairValidate from "../validate/impl/PairValidate";
import SingleValidate from "../validate/impl/SingleValidate";
import StraightValidate from "../validate/impl/StraightValidate";
import TriplePairValidate from "../validate/impl/TriplePairValidate";
import TripleSingleValidate from "../validate/impl/TripleSingleValidate";
import TripleValidate from "../validate/impl/TripleValidate";
import PlayCardTypeValidate from "../validate/PlayCardTypeValidate";

export default class CardUtil {

  public static playCardTypeValidateMap : Map<PlayCardType, PlayCardTypeValidate> = new Map();

  public static initPlayCardTypeValidateMap() : void {
    if (this.playCardTypeValidateMap.size > 0) {
      return;
    }

    let playCardTypeValidate : PlayCardTypeValidate = new SingleValidate();
    this.playCardTypeValidateMap.set(playCardTypeValidate.getPlayCardTypeEnumeration(), playCardTypeValidate);
    playCardTypeValidate = new StraightValidate();
    this.playCardTypeValidateMap.set(playCardTypeValidate.getPlayCardTypeEnumeration(), playCardTypeValidate);

    playCardTypeValidate = new PairValidate();
    this.playCardTypeValidateMap.set(playCardTypeValidate.getPlayCardTypeEnumeration(), playCardTypeValidate);
    playCardTypeValidate = new PairStraightValidate();
    this.playCardTypeValidateMap.set(playCardTypeValidate.getPlayCardTypeEnumeration(), playCardTypeValidate);

    playCardTypeValidate = new TripleValidate();
    this.playCardTypeValidateMap.set(playCardTypeValidate.getPlayCardTypeEnumeration(), playCardTypeValidate);
    playCardTypeValidate = new TripleSingleValidate();
    this.playCardTypeValidateMap.set(playCardTypeValidate.getPlayCardTypeEnumeration(), playCardTypeValidate);
    playCardTypeValidate = new TriplePairValidate();
    this.playCardTypeValidateMap.set(playCardTypeValidate.getPlayCardTypeEnumeration(), playCardTypeValidate);

    playCardTypeValidate = new AirplaneValidate();
    this.playCardTypeValidateMap.set(playCardTypeValidate.getPlayCardTypeEnumeration(), playCardTypeValidate);
    playCardTypeValidate = new AirplaneSingleValidate();
    this.playCardTypeValidateMap.set(playCardTypeValidate.getPlayCardTypeEnumeration(), playCardTypeValidate);
    playCardTypeValidate = new AirplanePairValidate();
    this.playCardTypeValidateMap.set(playCardTypeValidate.getPlayCardTypeEnumeration(), playCardTypeValidate);

    playCardTypeValidate = new FourSingleValidate();
    this.playCardTypeValidateMap.set(playCardTypeValidate.getPlayCardTypeEnumeration(), playCardTypeValidate);
    playCardTypeValidate = new FourPairValidate();
    this.playCardTypeValidateMap.set(playCardTypeValidate.getPlayCardTypeEnumeration(), playCardTypeValidate);

    playCardTypeValidate = new BombValidate();
    this.playCardTypeValidateMap.set(playCardTypeValidate.getPlayCardTypeEnumeration(), playCardTypeValidate);
    playCardTypeValidate = new BombKingValidate();
    this.playCardTypeValidateMap.set(playCardTypeValidate.getPlayCardTypeEnumeration(), playCardTypeValidate);
  }

  public static quickSortOneCardList(start : number, end : number, cardList : Array<Card>) : void {
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

    this.quickSortOneCardList(start, middle - 1, cardList);
    this.quickSortOneCardList(middle + 1, end, cardList);
  }

  public static generateOtherUserCard(cardList : Array<Card>) : Array<Card> {
    let otherUserCard : Array<Card> = new Array();
    for (let i = 0; i < cardList.length; i++) {
      otherUserCard.push(CardEnumeration.CARD_500);
    }
    return otherUserCard;
  }

  public static generalCalculatePlayCardType(playCardList: Array<Card>): Map<PlayCardType, Array<Card>> {
    let maxSameValueCardCount : number = this.formatCardList(playCardList);

    let playCardTypeMap : Map<PlayCardType, Array<Card>> = new Map();

    this.initPlayCardTypeValidateMap();

    let size : number = playCardList.length;
    if (1 == maxSameValueCardCount) {
        if (1 == size) {
            playCardTypeMap.set(PlayCardTypeEnumeration.SINGLE, playCardList);
        }
        else if (2 == size) {
            let playCardTypeValidate : PlayCardTypeValidate = this.playCardTypeValidateMap.get(PlayCardTypeEnumeration.BOMB_KING);
            if (playCardTypeValidate.match(playCardList)) {
                playCardTypeMap.set(PlayCardTypeEnumeration.BOMB_KING, playCardList);
            }
        }
        else if (size >= 5) {
            let playCardTypeValidate : PlayCardTypeValidate = this.playCardTypeValidateMap.get(PlayCardTypeEnumeration.STRAIGHT);
            if (playCardTypeValidate.match(playCardList)) {
                playCardTypeMap.set(PlayCardTypeEnumeration.STRAIGHT, playCardList);
            }
        }
    }
    else if (2 == maxSameValueCardCount) {
       if (2 == size) {
           let playCardTypeValidate : PlayCardTypeValidate = this.playCardTypeValidateMap.get(PlayCardTypeEnumeration.PAIR);
           if (playCardTypeValidate.match(playCardList)) {
               playCardTypeMap.set(PlayCardTypeEnumeration.PAIR, playCardList);
           }
       }
       else if (size >= 6) {
           let playCardTypeValidate : PlayCardTypeValidate = this.playCardTypeValidateMap.get(PlayCardTypeEnumeration.PAIR_STRAIGHT);
           if (playCardTypeValidate.match(playCardList)) {
               playCardTypeMap.set(PlayCardTypeEnumeration.PAIR_STRAIGHT, playCardList);
           }
       }
    }
    else if (3 == maxSameValueCardCount) {
        if (3 == size) {
            playCardTypeMap.set(PlayCardTypeEnumeration.TRIPLE, playCardList);
        }
        else if (4 == size) {
            playCardTypeMap.set(PlayCardTypeEnumeration.TRIPLE_SINGLE, playCardList);
        }
        else if (5 == size) {
            let playCardTypeValidate : PlayCardTypeValidate = this.playCardTypeValidateMap.get(PlayCardTypeEnumeration.TRIPLE_PAIR);
            if (playCardTypeValidate.match(playCardList)) {
                playCardTypeMap.set(PlayCardTypeEnumeration.TRIPLE_PAIR, playCardList);
            }
        }
        else if (size % 3 == 0) {
            let playCardTypeValidate : PlayCardTypeValidate = this.playCardTypeValidateMap.get(PlayCardTypeEnumeration.AIRPLANE);
            if (playCardTypeValidate.match(playCardList)) {
                playCardTypeMap.set(PlayCardTypeEnumeration.AIRPLANE, playCardList);
            }
        }
        else if (size % 4 == 0) {
            let playCardTypeValidate : PlayCardTypeValidate = this.playCardTypeValidateMap.get(PlayCardTypeEnumeration.AIRPLANE_SINGLE);
            if (playCardTypeValidate.match(playCardList)) {
                playCardTypeMap.set(PlayCardTypeEnumeration.AIRPLANE_SINGLE, playCardList);
            }
        }
        else if (size % 5 == 0) {
            let playCardTypeValidate : PlayCardTypeValidate = this.playCardTypeValidateMap.get(PlayCardTypeEnumeration.AIRPLANE_PAIR);
            if (playCardTypeValidate.match(playCardList)) {
                playCardTypeMap.set(PlayCardTypeEnumeration.AIRPLANE_PAIR, playCardList);
            }
        }
    }
    else if (4 == maxSameValueCardCount) {
        if (4 == size) {
            playCardTypeMap.set(PlayCardTypeEnumeration.BOMB, playCardList);
        }
        else if (size == 6) {
            playCardTypeMap.set(PlayCardTypeEnumeration.FOUR_SINGLE, playCardList);
        }
        else if (size == 8) {
            playCardTypeMap.set(PlayCardTypeEnumeration.FOUR_PAIR, playCardList);
            let anotherTypeCardList : Array<Card> = this.anotherTypeForFourPair(playCardList);
            let playCardTypeValidate : PlayCardTypeValidate = this.playCardTypeValidateMap.get(PlayCardTypeEnumeration.AIRPLANE_SINGLE);
            if (playCardTypeValidate.match(anotherTypeCardList)) {
                playCardTypeMap.set(PlayCardTypeEnumeration.AIRPLANE_SINGLE, anotherTypeCardList);
            }
        }
    }
    return playCardTypeMap;
  }

  public static formatCardList(playCardList : Array<Card>) : number {
    let playCardValueCountMap : Map<number, number> = this.getPlayCardValueCountMap(playCardList);

    this.quickSortOneCardList(0, playCardList.length - 1, playCardList);

    let playCardCountListMap : Map<number, Array<Card>> = this.getPlayCardCountListMap(playCardList, playCardValueCountMap);

    let countList : Array<number> = this.getSortedPlayCardCountList(playCardCountListMap);

    for (let i : number = 0, k = 0; i < countList.length; i++) {
        let cardEnumerationList : Array<Card> = playCardCountListMap.get(countList[i]);
        for (let j : number = 0; j < cardEnumerationList.length; j++) {
            playCardList[k] = cardEnumerationList[j];
            k++;
        }
    }

    return countList[0];
  }

  private static getPlayCardValueCountMap(playCardList : Array<Card>) : Map<number, number> {
    let playCardValueCountMap : Map<number, number> = new Map();
  
    for (let i = 0; i < playCardList.length; i++) {
        let count : number = playCardValueCountMap.get(playCardList[i].getValue());
        if (!count) {
            playCardValueCountMap.set(playCardList[i].getValue(), 1);
        }
        else {
            playCardValueCountMap.set(playCardList[i].getValue(), count + 1);
        }
    }
  
    return playCardValueCountMap;
  }

  private static getPlayCardCountListMap(sortedPlayCardList : Array<Card>, playCardValueCountMap : Map<number, number>) : Map<number, Array<Card>> {
    let playCardCountListMap : Map<number, Array<Card>> = new Map();
    playCardValueCountMap.forEach((value : number) => {
      playCardCountListMap.set(value, new Array());
    })

    for (let i : number = 0; i < sortedPlayCardList.length; i++) {
        let card : Card = sortedPlayCardList[i];
        let count : number = playCardValueCountMap.get(card.getValue());
        let cardEnumerationList : Array<Card> = playCardCountListMap.get(count);
        cardEnumerationList.push(card);
    }
    return playCardCountListMap;
  }

  private static getSortedPlayCardCountList(playCardCountListMap : Map<number, Array<Card>>) : Array<number> {
    let countList : Array<number> = new Array();
    playCardCountListMap.forEach((value : Array<Card>, key : number) => {
      countList.push(key);
    });

    this.selectionSort(countList);
    return countList;
  }

  public static selectionSort(countList : Array<number>) : void {
    if (1 == countList.length) {
        return;
    }

    for (let i : number = 0; i < countList.length - 1; i++) {
        let current : number = countList[i];
        for (let j : number = i + 1; j < countList.length; j++) {
            let tobeCompared : number = countList[j];
            if (tobeCompared > current) {
                countList[i] = tobeCompared;
                countList[j] = current;
                current = tobeCompared;
            }
        }
    }
  }

  private static anotherTypeForFourPair(playCardList : Array<Card>) : Array<Card> {
    let anotherTypeCardList : Array<Card>= new Array();
    for (let i : number = 0; i < playCardList.length; i++) {
        anotherTypeCardList[i] = playCardList[i];
    }
    anotherTypeCardList[3] = anotherTypeCardList[4];
    anotherTypeCardList[6] = anotherTypeCardList[0];
    return anotherTypeCardList;
  }

  public static firstCardListBiggerThanSecondCardList(playCardList1 : Array<Card>, playCardTypeEnumeration1 : PlayCardType, playCardList2 : Array<Card>, playCardTypeEnumeration2 : PlayCardType) : boolean {
    if (null == playCardTypeEnumeration2) {
      return true;
    }

    if (playCardTypeEnumeration1.getValue() > playCardTypeEnumeration2.getValue()) {
        return true;
    }
    else if (playCardTypeEnumeration1.getValue() < playCardTypeEnumeration2.getValue()) {
        return false;
    }
    else if (playCardTypeEnumeration1 === playCardTypeEnumeration2) {
        return playCardList1[0].getValue() > playCardList2[0].getValue();
    }
    return false;
  }

}
