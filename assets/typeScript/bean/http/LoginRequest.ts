import HttpRequest from "./HttpRequest";

export default class RegisterRequest extends HttpRequest {

  private userId : string;

  private password : string;

  constructor(userId : string, password : string) {
    super();
    this.userId = userId;
    this.password = password;
  }
  
}
