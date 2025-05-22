import { Component } from '@angular/core';


@Component({
  selector: 'fi-root',
  standalone: false,
  template: `<router-outlet />`,
})
export class AppComponent {
    constructor() { }
}
