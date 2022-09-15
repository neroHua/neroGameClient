import LocalStorageConstant from "../constant/LocalStorageConstant";

export default class UserUtil {

  public static getMyUserId() : string {
    let userInformationString = cc.sys.localStorage.getItem(LocalStorageConstant.USER_INFORMATION);
    let userInformation = JSON.parse(userInformationString);
    return userInformation.userId;
  }

}
