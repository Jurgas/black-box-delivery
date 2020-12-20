import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {Label} from '../../domain/label/models/label';
import {LabelService} from '../../services/label.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LabelData} from '../../domain/label/models/label-data';

@Component({
  selector: 'bbd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  labelFormGroup = new FormGroup({
    receiver: new FormControl('', [Validators.required]),
    POBoxId: new FormControl('', [Validators.required]),
    size: new FormControl('', [Validators.required]),
  });

  labels: Label[];

  constructor(private api: AuthService,
              private labelService: LabelService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.fetchLabels();
  }

  fetchLabels(): void {
    this.labelService.getLabels().subscribe(res => {
      this.labels = res._embedded.data;
    }, error => {
      this.openSnackBar(error.error.message);
      if (error.status === 401) {
        this.router.navigate(['/sender/login']);
      }
    });
  }

  deleteLabel(labelId: string): void {
    this.labelService.deleteLabel(labelId).subscribe( () => {
      this.fetchLabels();
    }, error => {
      this.openSnackBar(error.error.message);
      if (error.status === 401) {
        this.router.navigate(['/sender/login']);
      }
    });
  }

  onSubmit(formDirective: FormGroupDirective): void {
    if (this.labelFormGroup.valid) {
      const data: LabelData = {
        receiver: this.labelFormGroup.get('receiver').value,
        POBoxId: this.labelFormGroup.get('POBoxId').value,
        size: this.labelFormGroup.get('size').value,
      };
      this.labelService.createLabel(data).subscribe(() => {
        this.fetchLabels();
      }, error => {
        this.openSnackBar(error.error.message);
        if (error.status === 401) {
          this.router.navigate(['/sender/login']);
        }
      });
      this.labelFormGroup.reset();
      formDirective.resetForm();
    }
  }

  openSnackBar(msg: string): void {
    this.snackBar.open(msg, 'OK', {
      duration: 5000,
      verticalPosition: 'top',
    });
  }
}
