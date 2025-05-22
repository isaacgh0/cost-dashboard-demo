import { NgModule } from '@angular/core';
import { HomePageComponent } from './pages/home.page.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';

@NgModule({
    declarations: [
        HomePageComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePageComponent,
            }
        ]),
        SharedComponentsModule,
    ],
})
export class HomeModule { }