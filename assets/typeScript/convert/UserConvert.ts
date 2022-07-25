import GameUserMO from "../bean/game/user/GameUserMO";
import RoomUserInformationResponse from "../bean/http/user/RoomUserInformationResponse";

export default class UserConvert {

  public static convertResponseToMOForList(roomUserInformationResponseList : Array<RoomUserInformationResponse>) : Array<GameUserMO> {
    let gameUserMOList : Array<GameUserMO> = new Array();

    roomUserInformationResponseList.forEach( element => {
      gameUserMOList.push(UserConvert.convertResponseToMOForOne(element));
    });

    return gameUserMOList;
  }

  public static convertResponseToMOForOne(roomUserInformationResponse : RoomUserInformationResponse) : GameUserMO {
    let gameUserMO = new GameUserMO(roomUserInformationResponse.userId);
    gameUserMO.setPrepared(roomUserInformationResponse.prepared);
    return gameUserMO;
  }

}
