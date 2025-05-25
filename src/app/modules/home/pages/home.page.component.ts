import { Component } from '@angular/core';

@Component({
    selector: 'fi-home-page',
    standalone: false,
    template: `
    <ng-container>
        <!-- <app-drag-and-drop-test/> -->
        <app-kpis-demo/>
    </ng-container>
    `
})
export class HomePageComponent {
    constructor() { }
}