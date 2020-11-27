import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LoginRequest} from '../../domain/user/models/login-request';

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
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
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
