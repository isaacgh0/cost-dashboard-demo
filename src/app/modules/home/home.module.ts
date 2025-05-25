import { NgModule } from '@angular/core';
import { HomePageComponent } from './pages/home.page.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { KpisDemoComponent } from './components/kpis-demo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { InputTextModule } from 'primeng/inputtext';
import {DragDropModule, CdkDrag} from '@angular/cdk/drag-drop';
import { DragAndDropTestComponent } from './components/drag-and-drop-test.component';
import { TableModule } from 'primeng/table';


@NgModule({
    declarations: [
        HomePageComponent,
        // * Components.
        KpisDemoComponent,
        DragAndDropTestComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DragDropModule,
        CdkDrag,
        RouterModule.forChild([
            {
                path: '',
                component: HomePageComponent,
            }
        ]),
        
        // * Ngprime.
        CardModule,
        ButtonModule,
        ChartModule,
        InputTextModule,
        TableModule,
    ],
})
export class HomeModule { }