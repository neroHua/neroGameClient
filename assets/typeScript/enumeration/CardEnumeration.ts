
export default class Card {

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

export const CardEnumeration = { 
  CARD_103: new Card("CARD_103", "card_103", 3, "方块3"),
  CARD_104: new Card("CARD_104", "card_104", 4, "方块4"),
  CARD_105: new Card("CARD_105", "card_105", 5, "方块5"),
  CARD_106: new Card("CARD_106", "card_106", 6, "方块6"),
  CARD_107: new Card("CARD_107", "card_107", 7, "方块7"),
  CARD_108: new Card("CARD_108", "card_108", 8, "方块8"),
  CARD_109: new Card("CARD_109", "card_109", 9, "方块9"),
  CARD_110: new Card("CARD_110", "card_110", 10, "方块10"),
  CARD_111: new Card("CARD_111", "card_111", 11, "方块J"),
  CARD_112: new Card("CARD_112", "card_112", 12, "方块Q"),
  CARD_113: new Card("CARD_113", "card_113", 13, "方块K"),
  CARD_114: new Card("CARD_114", "card_114", 14, "方块1"),
  CARD_115: new Card("CARD_115", "card_115", 15, "方块2"),
  CARD_203: new Card("CARD_203", "card_203", 3, "梅花3"),
  CARD_204: new Card("CARD_204", "card_204", 4, "梅花4"),
  CARD_205: new Card("CARD_205", "card_205", 5, "梅花5"),
  CARD_206: new Card("CARD_206", "card_206", 6, "梅花6"),
  CARD_207: new Card("CARD_207", "card_207", 7, "梅花7"),
  CARD_208: new Card("CARD_208", "card_208", 8, "梅花8"),
  CARD_209: new Card("CARD_209", "card_209", 9, "梅花9"),
  CARD_210: new Card("CARD_210", "card_210", 10, "梅花10"),
  CARD_211: new Card("CARD_211", "card_211", 11, "梅花J"),
  CARD_212: new Card("CARD_212", "card_212", 12, "梅花Q"),
  CARD_213: new Card("CARD_213", "card_213", 13, "梅花K"),
  CARD_214: new Card("CARD_214", "card_214", 14, "梅花1"),
  CARD_215: new Card("CARD_215", "card_215", 15, "梅花2"),
  CARD_303: new Card("CARD_303", "card_303", 3, "红桃3"),
  CARD_304: new Card("CARD_304", "card_304", 4, "红桃4"),
  CARD_305: new Card("CARD_305", "card_305", 5, "红桃5"),
  CARD_306: new Card("CARD_306", "card_306", 6, "红桃6"),
  CARD_307: new Card("CARD_307", "card_307", 7, "红桃7"),
  CARD_308: new Card("CARD_308", "card_308", 8, "红桃8"),
  CARD_309: new Card("CARD_309", "card_309", 9, "红桃9"),
  CARD_310: new Card("CARD_310", "card_310", 10, "红桃10"),
  CARD_311: new Card("CARD_311", "card_311", 11, "红桃J"),
  CARD_312: new Card("CARD_312", "card_312", 12, "红桃Q"),
  CARD_313: new Card("CARD_313", "card_313", 13, "红桃K"),
  CARD_314: new Card("CARD_314", "card_314", 14, "红桃1"),
  CARD_315: new Card("CARD_315", "card_315", 15, "红桃2"),
  CARD_403: new Card("CARD_403", "card_403", 3, "黑桃3"),
  CARD_404: new Card("CARD_404", "card_404", 4, "黑桃4"),
  CARD_405: new Card("CARD_405", "card_405", 5, "黑桃5"),
  CARD_406: new Card("CARD_406", "card_406", 6, "黑桃6"),
  CARD_407: new Card("CARD_407", "card_407", 7, "黑桃7"),
  CARD_408: new Card("CARD_408", "card_408", 8, "黑桃8"),
  CARD_409: new Card("CARD_409", "card_409", 9, "黑桃9"),
  CARD_410: new Card("CARD_410", "card_410", 10, "黑桃10"),
  CARD_411: new Card("CARD_411", "card_411", 11, "黑桃J"),
  CARD_412: new Card("CARD_412", "card_412", 12, "黑桃Q"),
  CARD_413: new Card("CARD_413", "card_413", 13, "黑桃K"),
  CARD_414: new Card("CARD_414", "card_414", 14, "黑桃1"),
  CARD_415: new Card("CARD_415", "card_415", 15, "黑桃2"),
  CARD_500: new Card("CARD_500", "card_500", 0, "背面"),
  CARD_508: new Card("CARD_508", "card_508", 8, "狗子"),
  CARD_516: new Card("CARD_516", "card_516", 16, "小王"),
  CARD_517: new Card("CARD_517", "card_517", 17, "大王"),
}

export const CardEnumerationByCode = { 
  card_103: new Card("CARD_103", "card_103", 3, "方块3"),
  card_104: new Card("CARD_104", "card_104", 4, "方块4"),
  card_105: new Card("CARD_105", "card_105", 5, "方块5"),
  card_106: new Card("CARD_106", "card_106", 6, "方块6"),
  card_107: new Card("CARD_107", "card_107", 7, "方块7"),
  card_108: new Card("CARD_108", "card_108", 8, "方块8"),
  card_109: new Card("CARD_109", "card_109", 9, "方块9"),
  card_110: new Card("CARD_110", "card_110", 10, "方块10"),
  card_111: new Card("CARD_111", "card_111", 11, "方块J"),
  card_112: new Card("CARD_112", "card_112", 12, "方块Q"),
  card_113: new Card("CARD_113", "card_113", 13, "方块K"),
  card_114: new Card("CARD_114", "card_114", 14, "方块1"),
  card_115: new Card("CARD_115", "card_115", 15, "方块2"),
  card_203: new Card("CARD_203", "card_203", 3, "梅花3"),
  card_204: new Card("CARD_204", "card_204", 4, "梅花4"),
  card_205: new Card("CARD_205", "card_205", 5, "梅花5"),
  card_206: new Card("CARD_206", "card_206", 6, "梅花6"),
  card_207: new Card("CARD_207", "card_207", 7, "梅花7"),
  card_208: new Card("CARD_208", "card_208", 8, "梅花8"),
  card_209: new Card("CARD_209", "card_209", 9, "梅花9"),
  card_210: new Card("CARD_210", "card_210", 10, "梅花10"),
  card_211: new Card("CARD_211", "card_211", 11, "梅花J"),
  card_212: new Card("CARD_212", "card_212", 12, "梅花Q"),
  card_213: new Card("CARD_213", "card_213", 13, "梅花K"),
  card_214: new Card("CARD_214", "card_214", 14, "梅花1"),
  card_215: new Card("CARD_215", "card_215", 15, "梅花2"),
  card_303: new Card("CARD_303", "card_303", 3, "红桃3"),
  card_304: new Card("CARD_304", "card_304", 4, "红桃4"),
  card_305: new Card("CARD_305", "card_305", 5, "红桃5"),
  card_306: new Card("CARD_306", "card_306", 6, "红桃6"),
  card_307: new Card("CARD_307", "card_307", 7, "红桃7"),
  card_308: new Card("CARD_308", "card_308", 8, "红桃8"),
  card_309: new Card("CARD_309", "card_309", 9, "红桃9"),
  card_310: new Card("CARD_310", "card_310", 10, "红桃10"),
  card_311: new Card("CARD_311", "card_311", 11, "红桃J"),
  card_312: new Card("CARD_312", "card_312", 12, "红桃Q"),
  card_313: new Card("CARD_313", "card_313", 13, "红桃K"),
  card_314: new Card("CARD_314", "card_314", 14, "红桃1"),
  card_315: new Card("CARD_315", "card_315", 15, "红桃2"),
  card_403: new Card("CARD_403", "card_403", 3, "黑桃3"),
  card_404: new Card("CARD_404", "card_404", 4, "黑桃4"),
  card_405: new Card("CARD_405", "card_405", 5, "黑桃5"),
  card_406: new Card("CARD_406", "card_406", 6, "黑桃6"),
  card_407: new Card("CARD_407", "card_407", 7, "黑桃7"),
  card_408: new Card("CARD_408", "card_408", 8, "黑桃8"),
  card_409: new Card("CARD_409", "card_409", 9, "黑桃9"),
  card_410: new Card("CARD_410", "card_410", 10, "黑桃10"),
  card_411: new Card("CARD_411", "card_411", 11, "黑桃J"),
  card_412: new Card("CARD_412", "card_412", 12, "黑桃Q"),
  card_413: new Card("CARD_413", "card_413", 13, "黑桃K"),
  card_414: new Card("CARD_414", "card_414", 14, "黑桃1"),
  card_415: new Card("CARD_415", "card_415", 15, "黑桃2"),
  card_500: new Card("CARD_500", "card_500", 0, "背面"),
  card_508: new Card("CARD_508", "card_508", 8, "狗子"),
  card_516: new Card("CARD_516", "card_516", 16, "小王"),
  card_517: new Card("CARD_517", "card_517", 17, "大王"),
}

export const convertServerCardNameToClientCard = (serverCardName : string) : Card => {
  return CardEnumeration[serverCardName];
}

export const convertServerCardNameListToClientCardList = (serverCardNameList : Array<string>) : Array<Card> => {
  let cardList = new Array(serverCardNameList.length);
  for (let i = 0; i < serverCardNameList.length; i++) {
    cardList[i] = CardEnumeration[serverCardNameList[i]];
  }
  return cardList;
}

export const convertClientCardListToServerCardNameList = (cardList: Array<Card>) : Array<string> => {
  let serverCardNameList = new Array(cardList.length);
  for (let i = 0; i < serverCardNameList.length; i++) {
    serverCardNameList[i] = cardList[i].getServerCardName();
  }
  return serverCardNameList;
}

export const convertCodeToClientCard = (code: string) : Card => {
  return CardEnumerationByCode[code];
}

export const convertCodeListToClientCardList = (codeList: Array<string>) : Array<Card> => {
  let cardList = new Array(codeList.length);
  for (let i = 0; i < codeList.length; i++) {
    cardList[i] = CardEnumerationByCode[codeList[i]];
  }
  return cardList;
}
