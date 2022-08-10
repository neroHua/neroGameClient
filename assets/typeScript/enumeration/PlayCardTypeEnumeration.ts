
export default class PlayCardType {

  private readonly serverCardName : string;

  private readonly code : string;
  
  private readonly value : number;

  private readonly message: string;

  constructor (serverCardName : string, code : string, value : number, message : string) {
    this.serverCardName= serverCardName;
    this.code = code;
    this.value = value;
    this.message = message;
  }

  public getServerCardName() : string {
    return this.serverCardName;
  }

  public getCode() : string {
    return this.code;
  }

  public getValue() : number {
    return this.value;
  }

  public getMessage() : string {
    return this.message;
  }

}

export const PlayCardTypeEnumeration = { 
  SINGLE: new PlayCardType("SINGLE", "single", 0, "单牌"),
  STRAIGHT: new PlayCardType("STRAIGHT", "straight", 0, "顺子"),

  PAIR: new PlayCardType("PAIR", "pair", 0, "对子"),
  PAIR_STRAIGHT: new PlayCardType("PAIR_STRAIGHT", "pairStraight", 0, "连对"),

  TRIPLE: new PlayCardType("TRIPLE", "triple", 0, "三不带"),
  TRIPLE_SINGLE: new PlayCardType("TRIPLE_SINGLE", "tripleSingle", 0, "三带一"),
  TRIPLE_PAIR: new PlayCardType("TRIPLE_PAIR", "triplePair", 0, "三带一对"),

  AIRPLANE: new PlayCardType("AIRPLANE", "airplane", 0, "飞机不带"),
  AIRPLANE_SINGLE: new PlayCardType("AIRPLANE_SINGLE", "airplaneSingle", 0, "飞机带单"),
  AIRPLANE_PAIR: new PlayCardType("AIRPLANE_PAIR", "airplanePair", 0, "飞机带对"),

  FOUR_SINGLE: new PlayCardType("FOUR_SINGLE", "fourSingle", 0, "4带2"),
  FOUR_PAIR: new PlayCardType("FOUR_PAIR", "fourPair", 0, "4带2对"),

  BOMB: new PlayCardType("BOMB", "bomb", 1, "炸弹"),
  BOMB_KING: new PlayCardType("BOMB_KING", "bombKing", 2, "王炸"),
}

export const convertServerPlayCardTypeNameToClientPlayCardType = (serverPlayCardTypeName : string) : PlayCardType => {
  return PlayCardTypeEnumeration[serverPlayCardTypeName];
}
