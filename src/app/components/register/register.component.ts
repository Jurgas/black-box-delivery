import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {User} from '../../domain/user/models/user';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';

@Component({
  selector: 'bbd-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerFormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.pattern('[A-Z ĄĆĘŁŃÓŚŹŻ][a-z ąćęłńóśźż]+')]),
    lastname: new FormControl('', [Validators.required, Validators.pattern('[A-Z ĄĆĘŁŃÓŚŹŻ][a-z ąćęłńóśźż]+')]),
    password: new FormControl('', [Validators.required, Validators.pattern('.{8,}')]),
    passwordConfirm: new FormControl('', [Validators.required, Validators.pattern('.{8,}')]),
    username: new FormControl('', [Validators.required, Validators.pattern('[a-z]{3,12}')], [this.userTaken.bind(this)]),
    email: new FormControl('', [Validators.required, Validators.pattern('(?:[A-Za-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[A-Za-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[A-Za-z0-9-]*[A-Za-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])')]),
    address: new FormControl('', [Validators.required])
  });

  loginAvailable = false;

  constructor(private api: AuthService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  checkPasswords(): boolean {
    if (this.registerFormGroup.controls.password.value ===
      this.registerFormGroup.controls.passwordConfirm.value) {
      return true;
    }
    this.registerFormGroup.controls.passwordConfirm.setErrors({confirm: true});
    return false;
  }


  onRegister(): void {
    if (!this.checkPasswords()) {
      return;
    }
    if (this.registerFormGroup.valid) {
      const data: User = {
        firstname: this.registerFormGroup.get('firstname').value,
        lastname: this.registerFormGroup.get('lastname').value,
        password: this.registerFormGroup.get('password').value,
        username: this.registerFormGroup.get('username').value,
        email: this.registerFormGroup.get('email').value,
        address: this.registerFormGroup.get('address').value
      };
      this.api.registerUser(data).subscribe(() => {
        this.router.navigate(['/sender/login']);
      }, error => {
        this.openSnackBar(error.message);
      });
    }

  }

  openSnackBar(msg: string): void {
    this.snackBar.open(msg, 'OK', {
      duration: 5000,
      verticalPosition: 'top',
    });
  }

  userTaken(control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>(resolve => {
      this.api.checkUsername(control.value).subscribe(() => {
        resolve(null);
      }, () => {
        resolve({userTaken: true});
      });
    });
  }

}
