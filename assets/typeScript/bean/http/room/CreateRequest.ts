import GameType from "../../../enumeration/GameTypeEnumeration";
import HttpRequest from "../HttpRequest";

export default class JoinRequest extends HttpRequest {

  private gameTypeEnumeration : string;

  constructor(gameTypeEnumeration : GameType) {
    super();
    this.gameTypeEnumeration = gameTypeEnumeration.getServerName();
  }

}
