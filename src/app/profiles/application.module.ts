import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: 'home',
                loadChildren: () => import('../modules/home/home.module').then(m => m.HomeModule)
            }
        ]),
    ],
})
export class ApplicationModule { }