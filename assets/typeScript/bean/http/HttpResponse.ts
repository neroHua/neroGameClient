import BaseBean from "../BaseBean";

export default class HttpResponse <T> extends BaseBean {

  public success : boolean;

  public errorCode : string;

  public errorMessage : string;

  public data : T;

  constructor(success : boolean , errorCode : string, errorMessage : string, data : T) {
    super();
    this.success = success;
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
    this.data = data;
  }

}
