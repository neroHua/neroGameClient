export default class UserInformationResponse {

  public userId : string;
  public nickName : string;

  constructor(userId : string, nickName : string) {
    this.userId = userId;
    this.nickName = nickName;
  }

}
