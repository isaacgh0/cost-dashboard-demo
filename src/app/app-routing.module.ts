import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';

const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./profiles/public.module').then(m => m.PublicModule)
    },
    {
        path: 'app',
        loadChildren: () => import('./profiles/application.module').then(m => m.ApplicationModule),
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
