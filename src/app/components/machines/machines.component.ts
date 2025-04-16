import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatOption, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-machines',
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
    MatOptionModule,
    FormsModule,
    MatOption,
    MatSelectModule,
    MatSlideToggleModule
  ],
  templateUrl: './machines.component.html',
  styleUrl: './machines.component.css'
})
export class MachinesComponent {
  machineForm: FormGroup;
  editIndex: number = -1;
  machineList: any[] = [
    {
      machineNo: 123,
      nozelNo: 1,
      fuelType: 'petrol',
      active:true
    }
  ];
  displayedColumns: string[] = ['machineNo', 'nozelNo', 'fuelType', 'active', 'actions'];

  constructor(private fb: FormBuilder) {
    this.machineForm = this.fb.group({
      machineNo: ['', Validators.required],
      nozelNo: ['', Validators.required],
      fuelType: ['', Validators.required],
    });
  }

  addMachine() {
    if (this.machineForm.valid) {
      this.machineList.push({
        ...this.machineForm.value,
        active: true,
      });
      this.machineForm.reset();
    }
  }

  deleteMachine(machine: any) {
    this.machineList = this.machineList.filter(m => m !== machine);
  }

  editMachine(index: number) {
    const machine = this.machineList[index];
    this.machineForm.setValue({ machineNo: machine.machineNo, nozelNo : machine.nozelNo, fuelType:machine.fuelType });
    this.editIndex = index;
  }
}
