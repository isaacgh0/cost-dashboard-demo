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

    private storage: Storage = window.localStorage;
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

    public login(): void {
        const credentials: string | null = this.storage.getItem('credentials');
        const { valid, value } = this.loginForm;
        const saved: Session | null = credentials
            ? JSON.parse(credentials)
            : null;
        
        if (!valid) return;

        const { email, password } = value;

        if (!saved) this.storage.setItem('credentials', JSON.stringify({ email, password }));
        if (!saved || (saved.email === email && saved.password === password)) {
            this.$authenticated.update(() => true);
            this._router.navigate(['app', 'home']);
            return;
        }

        this.$authenticated.update(() => false);
        this.loginForm.reset();
    }

    public logout(): void {
        this.$authenticated.update(() => false);
        this._router.navigate(['/']);
    }
}