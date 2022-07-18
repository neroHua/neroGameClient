import HttpRequest from "../bean/http/HttpRequest";
import HttpResponse from "../bean/http/HttpResponse";
import HttpServerConfig from "../config/HttpServerConfig";
import LocalStorageConstant from "../constant/LocalStorageConstant";

export default class HttpManager extends cc.Component {

  private static readonly GET : string = 'GET';
  private static readonly POST : string = 'POST';

  public static get<M extends HttpRequest, HttpResponse>(requestBean: M, url: string) : HttpResponse {
    let request = new XMLHttpRequest();
    let responseText = null;
    request.onreadystatechange = () => {
      if (request.readyState == 4 && request.status == 200) {
        responseText = request.responseText;
        console.log(responseText);
      }
    }
    if (null == requestBean) {
      request.open(HttpManager.GET, HttpServerConfig.HTTP_URL_PRE_FIX + url, false);
    }
    else {
      request.open(HttpManager.GET, HttpServerConfig.HTTP_URL_PRE_FIX + url + '?' + this.beanToURLString(requestBean), false);
    }
    request.setRequestHeader("Content-type","application/json");
    request.setRequestHeader(LocalStorageConstant.TOKEN, cc.sys.localStorage.getItem(LocalStorageConstant.TOKEN));
    request.send(null);
    return JSON.parse(responseText);
  }

  public static post<M extends HttpRequest, HttpResponse>(requestBean: M, url: string) : HttpResponse{
    let request = new XMLHttpRequest();
    let responseText = null;
    request.onreadystatechange = () => {
      if (request.readyState == 4 && request.status == 200) {
        responseText = request.responseText;
        console.log(responseText);
      }
    }
    request.open(HttpManager.POST, HttpServerConfig.HTTP_URL_PRE_FIX + url, false);
    request.setRequestHeader("Content-type","application/json");
    request.setRequestHeader("token", cc.sys.localStorage.getItem("token"));
    request.send(JSON.stringify(requestBean));
    return JSON.parse(responseText);
  }

  private static beanToURLString(bean): String {  
    if (!bean) {
      return '';
    }

    var url = '';  
    for (let key of Object.keys(bean)) {  
      url += this.beanToURLString(bean[key], key);  
    } 

    return url;  
  };  

  private static beanToURLString(value: any, key : string): String {  
    if (!value) {
      return '';
    }

    var url = '';  
    var valueType = typeof (value);  
    if (valueType == 'string' || valueType == 'number' || valueType == 'boolean') {  
      url += '&' + key + '=' + value;  
      return url;
    }

    for (var i in value) {
      var k = key == null ? i : key + (value instanceof Array ? '[' + i + ']' : '.' + i);  
      url += this.beanToURLString(value[i], k);  
    }  

    return url;  
  };  

}
