import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse }
  from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
declare function unescape(s:string): string;
declare function escape(s:string): string;
@Injectable()
export class Interceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(req).do(evt => {
      if (evt instanceof HttpResponse) {
        console.log('---> status:', evt.status);
        console.log('---> filter:', req.params.get('filter'));
      }
    });

  }
  encodeString(inputString) {
    if (inputString == null) {
        return inputString;
    }
    var outputString = window.btoa(unescape(encodeURIComponent(inputString)));
    return outputString;
}

decodeString(inputString) {
  if (inputString == null) {
      return inputString;
  }
  try {
      var res = inputString.match('^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$');
  } catch (ex) {}

  if (res == null) {
      return inputString;
  }
  var outputString = decodeURIComponent(escape(window.atob(inputString)));
  return outputString;
}
}