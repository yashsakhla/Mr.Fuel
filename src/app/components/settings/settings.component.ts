import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule,FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,MatSnackBarModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  fuels = [
    { name: 'Petrol', value: 108.50, originalValue: 108.50, changed: false },
    { name: 'Diesel', value: 96.25, originalValue: 96.25, changed: false },
    { name: 'Power', value: 112.75, originalValue: 112.75, changed: false }
  ];

  constructor(private snackBar: MatSnackBar) {}

  checkChanges(fuel: any) {
    fuel.changed = parseFloat(fuel.value) !== parseFloat(fuel.originalValue);
  }

  updateFuelValue(fuel: any) {
    fuel.originalValue = parseFloat(fuel.value).toFixed(2);
    fuel.changed = false;
    this.snackBar.open(`${fuel.name} price updated successfully!`, 'Close', {
      duration: 3000
    });
  }
}
