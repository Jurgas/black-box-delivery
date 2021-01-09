import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {AuthService as Auth0Service} from '@auth0/auth0-angular';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LoginRequest} from '../../domain/user/models/login-request';
import {Auth0Request} from '../../domain/user/models/auth0-request';

@Component({
  selector: 'bbd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern('[a-z]{3,12}')]),
    password: new FormControl('', [Validators.required, Validators.pattern('.{8,}')]),
  });

  constructor(private api: AuthService,
              private router: Router,
              private snackBar: MatSnackBar,
              private auth: Auth0Service) {
  }

  ngOnInit(): void {
    this.loginWithAuth0();
  }

  loginWithAuth0(): void {
    this.auth.isAuthenticated$.subscribe(
      () => {
        this.auth.user$.subscribe( user => {
          const data: Auth0Request = {
            email: user.email,
            sub: user.sub,
          };
          this.api.loginAuth0(data).subscribe( () => {
            this.router.navigate(['/']);
          });
        });
      });
  }

  onSubmit(): void {
    if (this.loginFormGroup.valid) {
      const data: LoginRequest = {
        username: this.loginFormGroup.get('username').value,
        password: this.loginFormGroup.get('password').value,
      };
      this.api.login(data).subscribe(() => {
        this.router.navigate(['/']);
      }, error => {
        this.openSnackBar(error.error.message);
      });
    }
  }

  openSnackBar(msg: string): void {
    this.snackBar.open(msg, 'OK', {
      duration: 5000,
      verticalPosition: 'top',
    });
  }
}
