import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Session } from '../types/auth.type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

const VALID_PASSWORD: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[&_.:,;@#\-$|¬°!"%\/='?¿¡+*~{}\[\]\(\)^])[a-zA-Z\d&_.:,;@#\-$|¬°!"%\/='?¿¡+*~{}\[\]\(\)^]{8,}$/;

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly _router: Router = inject(Router);
    private readonly _builder: FormBuilder = inject(FormBuilder);

    private cookie: CookieStore = window.cookieStore;
    private $authenticated: WritableSignal<boolean> = signal(false);

    private loginForm: FormGroup = this._builder.group({
        email: ['', {
            nonNullable: true,
            validators: [
                Validators.required,
                Validators.email,
            ]
        }],
        password: ['', {
            nonNullable: true,
            validators: [
                Validators.required,
                Validators.minLength(8),
                Validators.pattern(VALID_PASSWORD),
            ]
        }]
    });

    constructor() { }

    public get authenticated(): boolean {
        return this.$authenticated();
    }

    public set authenticated(value: boolean) {
        this.$authenticated.set(value);
    }

    public get form(): FormGroup {
        return this.loginForm;
    }

    public login(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.cookie.get('credentials')
                .then((credentials: Cookie | null)  => {
                    const { valid, value } = this.loginForm;
                    const saved: Session | null = credentials
                        ? JSON.parse(credentials.value)
                        : null;
                    
                    if (!valid) return reject({ code: 'form' });
            
                    const { email, password } = value;
            
                    if (!saved) this.cookie.set({
                        name: 'credentials',
                        value: JSON.stringify({ email, password }),
                        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
                        sameSite: 'strict', 
                    });
            
                    if (!saved || (saved.email === email && saved.password === password)) {
                        this.$authenticated.update(() => true);
                        this._router.navigate(['app', 'home']);
                        this.loginForm.reset();
                        return resolve();
                    }
            
                    this.$authenticated.update(() => false);
                    reject({ code: 'access' });
                })
                .catch(({ message }: Error) => reject({ message, code: 'cookie' }));
        });
    }

    public logout(): void {
        this.$authenticated.update(() => false);
        this._router.navigate(['login']);
    }

    public resetAccess(): Promise<void> {
        return new  Promise((resolve, reject) => {
            this.cookie.delete('credentials')
                .then(() => {
                    this.$authenticated.update(() => false);
                    return this._router.navigate(['login']);
                })
                .then(() => resolve())
                .catch((error: Error) => reject(error));
        })
    }
}