import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Sex} from '../../../models/sex';
import {RegisterService} from '../../services/register.service';
import {setSeconds} from 'ngx-bootstrap/chronos/utils/date-setters';

@Component({
  selector: 'bbd-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  odp: string;

  sexes: Sex[] = [
    {value: 'M', viewValue: 'Male'},
    {value: 'F', viewValue: 'Female'}
  ];

  registerFormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.pattern('[A-Z ĄĆĘŁŃÓŚŹŻ][a-z ąćęłńóśźż]+')]),
    lastname: new FormControl('', [Validators.required, Validators.pattern('[A-Z ĄĆĘŁŃÓŚŹŻ][a-z ąćęłńóśźż]+')]),
    password: new FormControl('', [Validators.required, Validators.pattern('.{8,}')]),
    passwordConfirm: new FormControl('', [Validators.required, Validators.pattern('.{8,}')]),
    sex: new FormControl('', Validators.required),
    photo: new FormControl('', Validators.required),
    login: new FormControl('', [Validators.required, Validators.pattern('[a-z]{3,12}')])
  });

  photoInputInvalid = false;
  photo: File;
  photoLabel = 'Choose File';
  loginAvailable = false;

  constructor(private api: RegisterService) {
  }

  ngOnInit(): void {
    this.registerFormGroup.controls.login.valueChanges.subscribe(value => {
      if (this.registerFormGroup.controls.login.valid) {
        this.api.checkUsername(value).subscribe(response => {
          console.log(response[value]);
          if (response[value] === 'available') {
            this.loginAvailable = true;
          } else {
            this.loginAvailable = false;
            this.registerFormGroup.controls.login.setErrors({taken: true});
          }
        }, error => {
          this.registerFormGroup.controls.login.setErrors({taken: true});
        });
      }
    });
  }

  onFileAdded(event): void {
    if (event.target.files.length > 0) {
      this.photo = event.target.files[0];
      this.photoLabel = this.photo.name;
      this.photoInputInvalid = this.registerFormGroup.controls.photo.invalid;
    }
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
    this.photoInputInvalid = this.registerFormGroup.controls.photo.invalid;
    if (!this.checkPasswords()) {
      return;
    }
    if (this.registerFormGroup.valid) {
      const formData = new FormData();
      formData.append('firstname', this.registerFormGroup.controls.firstname.value);
      formData.append('lastname', this.registerFormGroup.controls.lastname.value);
      formData.append('password', this.registerFormGroup.controls.password.value);
      formData.append('sex', this.registerFormGroup.controls.sex.value);
      formData.append('photo', this.photo, this.photo.name);
      formData.append('login', this.registerFormGroup.controls.login.value);
      this.api.registerUser(formData).subscribe(() => {
        console.log('gut');
      }, error => {
        if (error.status === 200) {
          this.odp = 'User has been registered';
        } else if (error.status === 400) {
          this.odp = 'There is already a user called ' + this.registerFormGroup.controls.login.value;
        } else {
          this.odp = 'Error';
        }
      });
    }

  }

}
