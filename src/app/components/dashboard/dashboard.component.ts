import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {
  MatHeaderCell,
  MatHeaderRow,
  MatRow,
  MatTableModule,
} from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-dashboard',
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
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  selectedDate!: Date;
  today = new Date();

  disableTodayAndFuture = (d: Date | null): boolean => {
    if (!d) return false;

    const date = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const todayDate = new Date(
      this.today.getFullYear(),
      this.today.getMonth(),
      this.today.getDate()
    );

    // Only allow dates before today
    return date.getTime() < todayDate.getTime();
  };

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
    console.log('Date selected:', this.selectedDate);
  }

  expenseColumns = ['type', 'amount'];
  creditorColumns = ['name', 'amount'];
  moneyCollectionColumns = ['type', 'denomination', 'count', 'total'];

  constructor() {}
  ngOnInit(): void {
    const rawCollection = [
      { type: 'note', denomination: 500, count: 3 },
      { type: 'note', denomination: 100, count: 10 },
      { type: 'coin', denomination: 10, count: 20 },
      { type: 'coin', denomination: 2, count: 5 },
    ];
    this.moneyCollection = this.getCompleteMoneyCollection(rawCollection);
    this.moneyCollectionColumns = ['type', 'denomination', 'count', 'total'];
    this.setDefaultDate();
  }

  setDefaultDate() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const elevenFiftyNine = new Date(today);
    elevenFiftyNine.setHours(23, 59, 59, 999); // 11:59:59 PM

    this.selectedDate =
      now <= elevenFiftyNine
        ? new Date(today.setDate(today.getDate() - 1)) // Yesterday
        : today; // Today

    this.loadDashboardData();
  }
}
