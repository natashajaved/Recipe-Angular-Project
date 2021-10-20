import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseDate {
    idToken: string
    email: string
    refreshToken: string
    expiresIn: string
    localId: string
    registered?: boolean
}
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user = new BehaviorSubject<User>(null)
    tokenTimer: any

    constructor(private http: HttpClient, private router: Router) {

    }
    signup(data: { email: string, password: string }) {
        return this.http.post<AuthResponseDate>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBpCe3KXPKiqUsdwfV81pAEFfWKxk5ZZeA
        `, {
            email: data.email,
            password: data.password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(data => {
            this.handleAuthetication(data.email, data.localId, data.idToken, +data.expiresIn)
        }))
    }

    login(data: { email: string, password: string }) {
        return this.http.post<AuthResponseDate>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBpCe3KXPKiqUsdwfV81pAEFfWKxk5ZZeA',
            {
                email: data.email,
                password: data.password,
                returnSecureToken: true
            }).pipe(catchError(this.handleError), tap(data => {
                this.handleAuthetication(data.email, data.localId, data.idToken, +data.expiresIn)
            }))
    }
    logout() {
        this.user.next(null)
        localStorage.removeItem("userData")
        this.router.navigate(['/auth'])
        if (this.tokenTimer) {
            clearTimeout(this.tokenTimer)
        }
        this.tokenTimer = null
    }

    autoLogin() {
        const user = JSON.parse(localStorage.getItem('userData'))
        if (!user) {
            return
        }
        const loadedUser = new User(user.email, user.id, user._token, new Date(user._tokenExpirationDate))
        if (loadedUser.token) {
            const time = new Date(user._tokenExpirationDate).getTime() - new Date().getTime()
            this.user.next(loadedUser)
            this.autoLogout(time)
        }
    }

    autoLogout(expirationDuration: number) {
        this.tokenTimer = setTimeout(() => {
            this.logout()
        }, expirationDuration)
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknow error occured'
        console.log({ errorRes })
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage)

        }

        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email already exists'
                break
            case 'INVALID_PASSWORD':
                errorMessage = "Incorrect password"
                break
            case 'EMAIL_NOT_FOUND':
                errorMessage = "INcorrect Email"
                break

        }
        return throwError(errorMessage)

    }

    private handleAuthetication(email: string, userId: string, token: string, expiresIn: number) {
        const user = new User(email, userId, token, new Date(new Date().getTime() + +expiresIn * 1000))
        this.user.next(user)
        localStorage.setItem('userData', JSON.stringify(user))
        this.autoLogout(expiresIn * 1000)
    }
}