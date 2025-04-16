import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

interface Manager {
  name: string;
  phone: string;
}
@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSnackBarModule,
  ],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.css'
})
export class StaffComponent implements OnInit {
  staffForm!: FormGroup;
  staffList: any[] = [{
    name: 'Ravi Patil',
    username: 'ravi123',
    password: '****',
    phone: '9876543210',
  },
  {
    name: 'Anita Sharma',
    username: 'anita2024',
    password: '****',
    phone: '9988776655',
  },];
  showFormPassword = false;
  showPassword: boolean[] = [];
  columns: string[] = ['name', 'username', 'phone', 'password', 'actions'];
  editIndex: number = -1;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.staffForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }
  ngOnInit(): void {
   
  }

  addStaff() {
    if (this.staffForm.valid) {
      this.staffList.push(this.staffForm.value);
      this.showPassword.push(false);
      this.staffForm.reset();
      this.snackBar.open('Staff added successfully!', 'Close', { duration: 3000 });
    }
  }

  deleteStaff(index: number) {
    this.staffList.splice(index, 1);
    this.showPassword.splice(index, 1);
  }

  editStaff(index: number) {
    const staff = this.staffList[index];
    this.staffForm.patchValue(staff);
    this.deleteStaff(index);
    this.editIndex = index;
  }

  togglePassword(index: number) {
    this.showPassword[index] = !this.showPassword[index];
  }
}

