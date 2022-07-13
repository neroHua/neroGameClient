import HttpRequest from "../bean/http/HttpRequest";
import HttpResponse from "../bean/http/HttpResponse";
import HttpServerConfig from "../config/HttpServerConfig";

export default class HttpManager {

  private static readonly GET : string = 'GET';
  private static readonly POST : string = 'POST';

  public static get<M extends HttpRequest, N extends HttpResponse>(requestBean: M, url: string) : N {
    let request = new XMLHttpRequest();
    let responseText = null;
    request.onreadystatechange = () => {
      if (request.readyState == 4 && request.status == 200) {
        responseText = request.responseText;
        console.log(responseText);
      }
    }
    request.open(HttpManager.GET, HttpServerConfig.HTTP_URL_PRE_FIX + url + '?' + this.beanToURLString(requestBean), true);
    request.setRequestHeader("Content-type","application/json");
    request.send();
    return JSON.parse(responseText);
  }

  public static post<M extends HttpRequest, N extends HttpResponse>(requestBean: M, url: string) : N {
    let request = new XMLHttpRequest();
    let responseText = null;
    request.onreadystatechange = () => {
      if (request.readyState == 4 && request.status == 200) {
        responseText = request.responseText;
        console.log(responseText);
      }
    }
    request.open(HttpManager.POST, HttpServerConfig.HTTP_URL_PRE_FIX + url, true);
    request.setRequestHeader("Content-type","application/json");
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
