import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MaterialModule} from './material.module';
import {BootstrapModule} from './bootstrap.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './components/home/home.component';
import {RegisterComponent} from './components/register/register.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from './components/header/header.component';
import {LoginComponent} from './components/login/login.component';
import {LogoutComponent} from './components/logout/logout.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AuthInterceptor} from './services/auth-interceptor';
import {AuthModule} from '@auth0/auth0-angular';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    HeaderComponent,
    LoginComponent,
    LogoutComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    BootstrapModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'jurgas.eu.auth0.com',
      clientId: '0x8qCFDujSqavwEmoUbUXlyP8L6KTF1A',
      redirectUri: 'https://black-box-delivery.herokuapp.com/sender/login'
    }),
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
