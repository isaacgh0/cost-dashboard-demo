import { Component } from '@angular/core';


@Component({
  selector: 'fi-root',
  template: `
    <h1>Welcome to {{title}}!</h1>
    <p-button label="Hola mundo" />

    <router-outlet />
  `,
  standalone: false,
})
export class AppComponent {
  title = 'cost-dashboard-demo';
}
