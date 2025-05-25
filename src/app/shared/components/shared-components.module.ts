import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import {DragDropModule, CdkDrag} from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CardModule,
        DragDropModule,
        CdkDrag
    ],
    exports: []
})
export class SharedComponentsModule { }