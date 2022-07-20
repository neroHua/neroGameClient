import HttpRequest from "../HttpRequest";

export default class JoinRequest extends HttpRequest {

  private roomId : number;

  constructor(roomId : number) {
    super();
    this.roomId = roomId;
  }

}
