import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

const SESSION_KEY: string = 'credentials';

@Injectable({
    providedIn: 'root',
})
class Auth {
    private readonly _router: Router = inject(Router);
    private readonly _auth: AuthService = inject(AuthService);

    private cookie: CookieStore = window.cookieStore;

    private isValidToken(): Promise<void> {
        return new Promise((resolve, reject) => {
            const authenticated: boolean = this._auth.authenticated;

            if (authenticated) return resolve();
            
            this.cookie.get(SESSION_KEY)
                .then((credentials: Cookie | null) => {
                    if (!credentials) return reject();

                    this._auth.authenticated = true;
                    resolve();
                })
                .catch(() => reject());
        });
    }

    public canActivate(_route: ActivatedRouteSnapshot, _: RouterStateSnapshot): Promise<boolean> {
        return new Promise((resolve, reject) => this.isValidToken()
            .then(() => resolve(true))
            .catch(() => {
                this._router.navigate(['login'])
                reject();
            }));
    }
}

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> =>
    inject(Auth).canActivate(route, state);