import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                loadChildren: () => import('../modules/login/login.module').then(m => m.LoginModule)
            }
        ])
    ]
})
export class PublicModule { }