import { AuthService } from './auth.service';
import { HttpClient, HttpHandler, HttpInterceptor, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInteceptorService implements HttpInterceptor {

    constructor(private authService: AuthService, private http: HttpClient) {

    }
    intercept(req: any, next: HttpHandler) {
        return this.authService.user.pipe(take(1), exhaustMap((user => {
            if (!user) {
                return next.handle(req)
            }
            const modifiedReq = req.clone({
                params: new HttpParams().set('auth', user.token)
            })
            return next.handle(modifiedReq)
        })))

    }
}
