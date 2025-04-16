import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOption, MatOptionModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-calculations',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,CommonModule,MatOption,MatOptionModule, MatFormFieldModule, MatError, MatSelectModule],
  templateUrl: './calculations.component.html',
  styleUrl: './calculations.component.css'
})
export class CalculationsComponent {
  selectedDate: Date = new Date();
  userRole: 'admin' | 'manager' = 'admin'; // Change as needed
  machines: any[] = [];
  testingForm!: FormGroup;
  testingIssueForm!: FormGroup;
  pumpExpensesForm!: FormGroup;
  personalExpensesForm!: FormGroup;
  creditorsForm!: FormGroup;

  moneyCollectionForm!: FormGroup;
  phonepeImage: File | null = null;
  cardImage: File | null = null;

  coinDenominations = [10, 1, 2, 5, 20];
  noteDenominations = [500, 100, 200, 50, 20, 10, 5, 2, 1];
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

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.fetchMachines();
    this.setDefaultDate();
    this.testingForm = this.fb.group({
      litersConsumption: ['', [Validators.required]],
      selectedMachine: ['ALL', [Validators.required]]
    });

    this.testingIssueForm = this.fb.group({
      litersConsumption: ['', [Validators.required]],
      selectedMachine: ['ALL', [Validators.required]]
    });

    this.pumpExpensesForm = this.fb.group({
      expenseType: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(0)]],
    });

    this.personalExpensesForm = this.fb.group({
      expenseType: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(0)]],
    });

    this.creditorsForm = this.fb.group({
      creditorName: ['', [Validators.required]],
      amountDue: ['', [Validators.required, Validators.min(0)]],
      creditorType: ['', [Validators.required]],
    });

    const formConfig: any = {
      phonepeAmount: ['', Validators.required],
      cardAmount: ['', Validators.required],
    };

    // Dynamically add coin & note controls
    this.coinDenominations.forEach((coin) => {
      formConfig[`coin_${coin}`] = [0];
    });

    this.noteDenominations.forEach((note) => {
      formConfig[`note_${note}`] = [0];
    });

    this.moneyCollectionForm = this.fb.group(formConfig);
  }

  loadData(){

  }

  fetchMachines() {
    this.machines = [
      {
        machineNo: 'M001',
        nozzleNo: 'N01',
        fuelType: 'Petrol',
        formGroup: this.fb.group({
          startReading: ['', Validators.required],
          endReading: ['', Validators.required]
        })
      },
      {
        machineNo: 'M002',
        nozzleNo: 'N02',
        fuelType: 'Diesel',
        formGroup: this.fb.group({
          startReading: ['', Validators.required],
          endReading: ['', Validators.required]
        })
      }
    ];
  }

  updateTesting() {
    if (this.testingForm.valid) {
      const formData = this.testingForm.value;
      console.log('Updated testing data:', formData);

      // Display success snackbar
      this.snackBar.open('Testing data updated successfully!', 'Close', {
        duration: 3000
      });

      // Optionally, reset the form after update
      this.testingForm.reset({
        litersConsumption: '',
        selectedMachine: 'ALL'
      });
    }
  }

  updateTestingIssue() {
    if (this.testingIssueForm.valid) {
      const formData = this.testingIssueForm.value;
      console.log('Updated testing data:', formData);

      // Display success snackbar
      this.snackBar.open('Testing data updated successfully!', 'Close', {
        duration: 3000
      });

      // Optionally, reset the form after update
      this.testingIssueForm.reset({
        litersConsumption: '',
        selectedMachine: 'ALL'
      });
    }
  }

  onImageCapture(event: any, machine: any) {
    const file = event.target.files[0];
    if (file) {
      machine.image = file;
    }
  }

  submitReading(machine: any) {
    if (!machine.image) {
      this.snackBar.open('Image is required!', 'Close', { duration: 3000 });
      return;
    }
  
    if (machine.formGroup.valid) {
      console.log('Submitted:', {
        machineNo: machine.machineNo,
        data: machine.formGroup.value,
        image: machine.image
      });
  
      this.snackBar.open('Reading submitted successfully', 'Close', { duration: 3000 });
      machine.formGroup.reset();
      machine.image = null; // clear image after submission
    }
  }

  submitPumpExpenses() {
    if (this.pumpExpensesForm.valid) {
      const pumpExpenseData = this.pumpExpensesForm.value;
      console.log('Pump Expenses submitted:', pumpExpenseData);
      this.snackBar.open('Pump Expenses submitted successfully!', 'Close', {
        duration: 3000,
      });
    }
  }

  // Handle Personal Expenses form submission
  submitPersonalExpenses() {
    if (this.personalExpensesForm.valid) {
      const personalExpenseData = this.personalExpensesForm.value;
      console.log('Personal Expenses submitted:', personalExpenseData);
      this.snackBar.open('Personal Expenses submitted successfully!', 'Close', {
        duration: 3000,
      });
    }
  }

  // Handle Creditors form submission
  submitCreditors() {
    if (this.creditorsForm.valid) {
      const creditorData = this.creditorsForm.value;
      console.log('Creditor data submitted:', creditorData);
      this.snackBar.open('Creditor details submitted successfully!', 'Close', {
        duration: 3000,
      });
    }
  }

  onImageCapture2(event: any, type: 'phonepe' | 'card') {
    const file = event.target.files[0];
    if (file) {
      if (type === 'phonepe') {
        this.phonepeImage = file;
      } else {
        this.cardImage = file;
      }
    }
  }

  submitMoneyCollection() {
    if (this.moneyCollectionForm.valid) {
      const formData = {
        ...this.moneyCollectionForm.value,
        phonepeImage: this.phonepeImage,
        cardImage: this.cardImage
      };
      console.log('Money Collection Submitted:', formData);
      // Your API or further logic here
    }
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

    this.loadData();
  }
}
