import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'bbd-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.authService.logout().subscribe(res => {
      this.openSnackBar(res.message);
      this.router.navigate(['/sender/login']);
    });
  }

  openSnackBar(msg: string): void {
    this.snackBar.open(msg, 'OK', {
      duration: 5000,
      verticalPosition: 'top',
    });
  }

}
