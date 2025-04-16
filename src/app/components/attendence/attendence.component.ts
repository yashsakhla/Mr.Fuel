import { Component } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Required for ngModel

// Angular Material Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCell, MatCellDef, MatColumnDef, MatTable, MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-attendence',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatDatepickerToggle,
    MatSelectModule,
    MatInputModule,
    MatOptionModule,
    MatTableModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatCell,MatOption, MatCellDef, MatColumnDef, MatCheckboxModule, MatIconModule
  ],
  templateUrl: './attendence.component.html',
  styleUrl: './attendence.component.css',
})
export class AttendenceComponent {
  selectedDate: Date = new Date();
  maxDate = new Date();

  displayedColumns: string[] = ['name', 'attendance'];

  staffList = [
    {
      name: 'John Doe',
      attendance: { present: false, half: false, absent: false },
    },
    {
      name: 'Jane Smith',
      attendance: { present: false, half: false, absent: false },
    },
    {
      name: 'Alex Johnson',
      attendance: { present: false, half: false, absent: false },
    },
  ];

  selectOnlyOne(staff: any, type: 'present' | 'half' | 'absent') {
    staff.attendance.present = type === 'present';
    staff.attendance.half = type === 'half';
    staff.attendance.absent = type === 'absent';
  }

  submitAttendance() {
    console.log('Selected Date:', this.selectedDate);
    console.log('Attendance:', this.staffList);
    // TODO: send data to backend
  }
}
