import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {LogoutComponent} from './components/logout/logout.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path: '', redirectTo: '/sender/dashboard', pathMatch: 'full'},
  {path: 'sender/register', component: RegisterComponent},
  {path: 'sender/login', component: LoginComponent},
  {path: 'sender/logout', component: LogoutComponent},
  {path: 'sender/dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
