import { NgModule } from '@angular/core';
import { LoginPageComponent } from './pages/login.page.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';

@NgModule({
    declarations: [
        LoginPageComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: LoginPageComponent,
            }
        ]),
        SharedComponentsModule,
    ],
})
export class LoginModule { }