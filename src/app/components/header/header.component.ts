import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AuthService as Auth0Service} from '@auth0/auth0-angular';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'bbd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(@Inject(DOCUMENT) public document: Document,
              public auth0: Auth0Service,
              public authService: AuthService) {
  }

  ngOnInit(): void {
  }

  authLogin(): void {
    this.authService.logout();
    this.auth0.loginWithRedirect();
  }

  authLogout(): void {
    this.authService.logout();
    this.auth0.logout({returnTo: document.location.origin});
  }

  getToken(): boolean {
    const idToken = AuthService.getToken();
    return !!idToken;
  }
}
