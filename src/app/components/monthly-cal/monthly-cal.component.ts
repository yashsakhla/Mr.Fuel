import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import {
  MatHeaderCell,
  MatHeaderRow,
  MatRow,
  MatTableModule,
} from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule, MatDatepickerToggle, MatDateRangePicker } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-monthly-cal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatDatepickerToggle,
    MatNativeDateModule
  ],
  providers:[DatePipe],
  templateUrl: './monthly-cal.component.html',
  styleUrl: './monthly-cal.component.css'
})
export class MonthlyCalComponent implements OnInit {
  // List of months
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // List of years (2024 to current year)
  years: number[] = [];
  
  selectedMonth!: string;
  selectedYear!: number;

  ngOnInit(): void {
    const rawCollection = [
      { type: 'note', denomination: 500, count: 3 },
      { type: 'note', denomination: 100, count: 10 },
      { type: 'coin', denomination: 10, count: 20 },
      { type: 'coin', denomination: 2, count: 5 },
    ];
    this.moneyCollection = this.getCompleteMoneyCollection(rawCollection);
    this.moneyCollectionColumns = ['type', 'denomination', 'count', 'total'];

    this.generateYears();
    
    // Default selected values
    const currentDate = new Date();
    this.selectedMonth = this.months[currentDate.getMonth()];  // Set to current month
    this.selectedYear = currentDate.getFullYear();  // Set to current year
  }

  generateYears(): void {
    const currentYear = new Date().getFullYear();
    this.years = [];
    for (let year = 2024; year <= currentYear; year++) {
      this.years.push(year);
    }
  }

  // On Submit: Do something with the selected month and year
  onSubmit(): void {
    console.log('Selected Month:', this.selectedMonth);
    console.log('Selected Year:', this.selectedYear);
  }
  
  readonly noteDenominations = [500, 200, 100, 50, 20, 10, 5, 2, 1];
  readonly coinDenominations = [20, 10, 5, 2, 1];

  getCompleteMoneyCollection(rawCollection: any[]): any[] {
    const finalCollection: any[] = [];

    this.noteDenominations.forEach((denom) => {
      const existing = rawCollection.find(
        (item) => item.type === 'note' && item.denomination === denom
      );
      finalCollection.push({
        type: 'note',
        denomination: denom,
        count: existing ? existing.count : 0,
      });
    });

    this.coinDenominations.forEach((denom) => {
      const existing = rawCollection.find(
        (item) => item.type === 'coin' && item.denomination === denom
      );
      finalCollection.push({
        type: 'coin',
        denomination: denom,
        count: existing ? existing.count : 0,
      });
    });

    return finalCollection;
  }

  filterDates = (date: Date | null): boolean => {
    if (!date) return false;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const inputDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    // Disable dates after today
    if (inputDate > today) return false;

    // Disable today before 12 PM
    if (inputDate.getTime() === today.getTime() && now.getHours() < 12) {
      return false;
    }

    return true;
  };

  machines = [
    { machineNo: 1, nozzleNo: 2, fuelType: 'Petrol', moneyGenerated: 12345 },
    { machineNo: 2, nozzleNo: 1, fuelType: 'Diesel', moneyGenerated: 9876 },
  ];

  testingExpenses = [
    { machineNo: 1, liters: 5, amount: 500 },
    { machineNo: 2, liters: 3, amount: 300 },
  ];

  pumpExpenses = [
    { type: 'Maintenance', amount: 1200 },
    { type: 'Cleaning', amount: 800 },
  ];

  personalExpenses = [
    { type: 'Tea', amount: 200 },
    { type: 'Lunch', amount: 500 },
  ];

  creditors = [
    { name: 'John', amount: 3000, type: 'lender' },
    { name: 'Ravi', amount: 1500, type: 'creditor' },
  ];

  phonePeAmount = 5000;
  cardSwipeAmount = 3500;

  moneyCollection = [
    { type: 'Note', denomination: 100, count: 10 },
    { type: 'Coin', denomination: 10, count: 50 },
  ];

  get overallMoney(): number {
    return this.machines.reduce((sum, m) => sum + m.moneyGenerated, 0);
  }

  get totalTestingExpense(): number {
    return this.testingExpenses.reduce((sum, t) => sum + t.amount, 0);
  }

  get totalCollected(): number {
    return this.moneyCollection.reduce(
      (sum, e) => sum + e.denomination * e.count,
      0
    );
  }

  loadDashboardData() {
    
  }

  expenseColumns = ['type', 'amount'];
  creditorColumns = ['name', 'amount'];
  moneyCollectionColumns = ['type', 'denomination', 'count', 'total'];

 
}
