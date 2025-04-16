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
  selector: 'app-manager',
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
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css',
})
export class ManagerComponent implements OnInit {
  editIndex: number = -1;
  managerForm: FormGroup;
  managers: any[] = [
    {
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
    },
  ];

  showPassword: boolean[] = [];
  displayedColumns: string[] = ['name', 'username', 'phone', 'password', 'actions'];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.managerForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });
  }

  ngOnInit(): void {
    this.showPassword = this.managers.map(() => false);
  }

  togglePassword(index: number) {
    this.showPassword[index] = !this.showPassword[index];
  }

  onSubmit() {
    if (this.managerForm.valid) {
      const managerData = this.managerForm.value;
      if (this.editIndex === -1) {
        this.managers.push(managerData);
        this.showToast('Manager added successfully!');
      } else {
        this.managers[this.editIndex] = managerData;
        this.editIndex = -1;
        this.showToast('Manager updated successfully!');
      }
      this.managerForm.reset();
    }
  }

  editManager(index: number) {
    const manager = this.managers[index];
    this.managerForm.setValue({ name: manager.name, username : manager.username, password:manager.password, phone: manager.phone });
    this.editIndex = index;
  }

  deleteManager(index: number) {
    this.managers.splice(index, 1);
    if (this.editIndex === index) {
      this.managerForm.reset();
      this.editIndex = -1;
    }
    this.showToast('Manager deleted');
  }

  showToast(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: 'mat-snackbar-success',
    });
  }
}
