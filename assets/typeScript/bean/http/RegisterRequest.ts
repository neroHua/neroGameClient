import HttpRequest from "./HttpRequest";

export default class RegisterRequest extends HttpRequest {

  private userId : string;

  private password : string;

  private nickName : string;

  constructor(userId : string, password : string, nickName : string) {
    super();
    this.userId = userId;
    this.password = password;
    this.nickName = nickName;
  }
  
}
