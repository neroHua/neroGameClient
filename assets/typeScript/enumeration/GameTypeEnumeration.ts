
export default class GameType {

  private readonly serverName : string;

  private readonly code : string;
  
  private readonly message: string;

  constructor (serverName : string, code : string, message : string) {
    this.serverName= serverName;
    this.code = code;
    this.message = message;
  }

  public getServerName() : string {
    return this.serverName;
  }

  public getCode() : string {
    return this.code;
  }

  public getMessage() : string {
    return this.message;
  }

}

export const GameTypeEnumeration = { 
  FIGHT_LANDLORD_FOR_THREE: new GameType("FIGHT_LANDLORD_FOR_THREE", "fight_landlord_for_three", "三人斗地主"),
  FIGHT_LANDLORD_FOR_FOUR: new GameType("FIGHT_LANDLORD_FOR_FOUR", "fight_landlord_for_four", "四人斗地主"),
  FIGHT_LANDLORD_FOR_FIVE: new GameType("FIGHT_LANDLORD_FOR_FIVE", "fight_landlord_for_five", "五人斗地主"),
}

export const convertServerNameToClientCard = (serverName : string) : GameType => {
  return GameTypeEnumeration[serverName];
}

export const convertServerNameListToClientCardList = (serverNameList : Array<string>) : Array<GameType> => {
  let cardList = new Array(serverNameList.length);
  for (let i = 0; i < serverNameList.length; i++) {
    cardList[i] = GameTypeEnumeration[serverNameList[i]];
  }
  return cardList;
}
