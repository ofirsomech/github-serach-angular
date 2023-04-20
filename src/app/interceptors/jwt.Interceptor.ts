import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = localStorage.getItem('token');
    if (authToken) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`),
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
