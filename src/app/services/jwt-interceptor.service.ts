import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class JwtInterceptorService {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    authReq = req.clone({ headers: req.headers.set('AppToken', `${environment.AppToken}`) });

    return next.handle(authReq);
  }
}

export const JwtInterceptorProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true }
];
