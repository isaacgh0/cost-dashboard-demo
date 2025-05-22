import { Component } from '@angular/core';

@Component({
  selector: 'fi-root',
  template: `
    <h1>Welcome to {{title}}!</h1>

    <router-outlet />
  `,
  standalone: false,
  styles: []
})
export class AppComponent {
  title = 'cost-dashboard-demo';
}
