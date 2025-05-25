import { NgModule } from '@angular/core';
import { LoginPageComponent } from './pages/login.page.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

@NgModule({
    declarations: [
        LoginPageComponent,
    ],
    imports: [
        CommonModule,
        NgOptimizedImage,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: LoginPageComponent,
            }
        ]),
        InputTextModule,
        PasswordModule,
        ButtonModule,
    ],
})
export class LoginModule { }