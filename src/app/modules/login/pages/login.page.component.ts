import { Component, inject } from "@angular/core";
import { AuthService } from "../../../core/auth/services/auth.service";
import { FormGroup } from "@angular/forms";

@Component({
    selector: 'fi-login-page',
    standalone: false,
    template: `
        <div class="w-full h-dvh md:h-screen flex">
            <div class="hidden md:block w-1/3 lg:w-1/2 h-full bg-fi-main p-10 transition-all">
                <div class="flex size-3.5 relative">
                    <img ngSrc="/assets/icons/icon-fi.svg" alt="brand-logo" class="invert" fill>
                </div>

                <div class="flex flex-col w-full md:w-10/12 mx-auto mt-12">
                    <span class="text-xl text-black">Diseño intuiitivo para personas</span>
                    <span class="text-black opacity-70 text-sm">Registra y analiza tus datos financieros con una interfaz sinple y optimizada para mostrar la información más importante.</span>
                </div>
            </div>
            <div class="w-full md:w-2/3 lg:w-1/2 h-full bg-white flex flex-col items-center justify-center transition-all relative">
                <div class="flex md:hidden size-3.5 absolute top-10 left-10">
                    <img ngSrc="/assets/icons/icon-fi-colored.svg" alt="brand-logo" fill>
                </div>

                <form class="flex flex-col w-10/12 md:w-2/3 mx-auto max-w-lg" [formGroup]="form">
                    <h1 class="mt-0 mb-10 text-2xl">Iniciar sesión</h1>

                    <div class="flex flex-col gap-2">
                        <label class="text-sm" for="email">Correo electrónico</label>
                        <input
                            pInputText
                            id="email"
                            name="email"
                            pSize="small"
                            formControlName="email"
                            placeholder="example@mail.com"
                            class="rounded-md placeholder:text-slate-400"
                            />
                    </div>

                    <div class="flex flex-col gap-2 mt-4">
                        <label class="text-sm" for="password">Contraseña</label>
                        <p-password
                            fluid
                            id="password"
                            name="password"
                            size="small"
                            formControlName="password"
                            styleClass="[&>input]:rounded-md [&>input]:placeholder:text-slate-400"
                            placeholder="········"
                            [feedback]="false"
                            [toggleMask]="true"
                            />
                        <small class="text-xs text-slate-500 -mb-2">Escribe una contraseña con almenos 8 caracteres</small>
                        <small class="text-xs text-slate-500 ">Tu contraseña debe contener almenos un símbolo, una letra minúscula, una letra mayúscula y un número</small>
                    </div>

                    <button
                        pButton
                        size="small"
                        label="Entrar"
                        class="bg-fi-main border-fi-main rounded-md mt-8"
                        (click)="login()"
                        >
                    </button>

                    <div class="relative my-8 border-b border-b-slate-300 w-full">
                        <span class="size-8 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 outline outline-slate-300 -outline-offset-10 rounded-full"></span>
                    </div>

                    <button
                        pButton
                        size="small"
                        label="Borrar registro de acceso"
                        class="py-2.5 rounded-md text-fi-main border-fi-main hover:bg-fi-main/10 active:bg-fi-main/20"
                        [outlined]="true"
                        (click)="resetAccess()"
                        >
                    </button>
                </form>
            </div>
        </div>
    `
})
export class LoginPageComponent {
    private readonly _auth: AuthService = inject(AuthService);

    public form: FormGroup = this._auth.form;

    constructor() { }

    public login(): void {
        this._auth.login().catch(({ code }: Record<string, string>) => {
            const messages: Record<string, string> = {
                'form':   'Completa de forma correcta el ininio de sesión',
                'access': 'Credenciales de acceso incorrectas',
                'cookie': 'Error al Iniciar sesión, contacta al administrador',
            };

            alert(messages[code] || messages['cookie']);
        });
    }

    public resetAccess(): void {
        this._auth.resetAccess()
            .then(() => alert('Registro de acceso eliminado'))
            .catch(() => alert('Error al eliminar el registro de acceso'));
    }
}