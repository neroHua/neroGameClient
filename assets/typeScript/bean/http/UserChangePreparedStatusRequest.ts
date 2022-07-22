import HttpRequest from "../HttpRequest";

export default class UserChangePreparedStatusRequest extends HttpRequest {

  private prepared : boolean;

  constructor(prepared : boolean) {
    super();
    this.prepared = prepared;
  }

}
