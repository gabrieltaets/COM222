import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate} from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User } from '../models';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
    public nextUrl;
    constructor(public http: HttpClient, public global: GlobalService, public router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.nextUrl = '/home';
        if(this.global.user === undefined) {
            this.nextUrl = state.url;
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }

    public authenticate(login: string, password: string): Observable<User> {
        return this.http.post<User>(this.global.URL+'authenticate', {
            login: login,
            password: password
        }, this.global.options).pipe(
            tap(u => {
                this.global.cookies.put('login', u.login);
                this.global.cookies.put('token', u.token);
                this.global.user = u;
                if(this.nextUrl) this.router.navigate([this.nextUrl]);
                this.nextUrl = '/home';
            })
        );
    }

    public register(user: User): Observable<User> {
        return this.http.post<User>(this.global.URL+'register', user, this.global.options).pipe(
            tap(u => {
                this.global.cookies.put('login', u.login);
                this.global.cookies.put('token', u.token);
                this.global.user = u;
            })
        )
    }

    public update(user: User): Observable<User> {
        return this.http.put<User>(this.global.URL+'user', user, this.global.options).pipe(
            tap(u => {
                this.global.user = u;
            })
        );
    }

    public checkout(cart: any): Observable<any> {
        return this.http.post(this.global.URL+'checkout', cart, this.global.options);
    }

    public getOrders(user: User): Observable<any> {
        return this.http.post(this.global.URL + 'orders', user, this.global.options);
    }

    public logout() {
        this.global.user = undefined;
        this.global.cookies.remove('login');
        this.global.cookies.remove('token');
    }
}
