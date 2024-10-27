import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authSvc: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const data = this.authSvc.authSubject$.getValue();
    if (!data) return next.handle(request);
    const clonedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${data.accessToken}`,
      },
    });

    return next.handle(clonedRequest);
  }
}
