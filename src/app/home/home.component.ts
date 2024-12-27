import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder
  ) {}

  showModal: boolean = false;
  creditCardDetails: any;
  cardLimit: number | undefined;
  showTransactionForm: boolean = false;
  showTransactions: boolean = false; // New flag for displaying transactions
  transactions: any[] = []; // Array to store transactions

  // Reactive Form for Transaction
  transactionForm: any;

  ngOnInit(): void {
    // Initialize the transaction form
    this.transactionForm = this.formBuilder.group({
      transactionType: ['', Validators.required], // 'repay' or 'withdraw'
      amount: [null, [Validators.required, Validators.min(0.01)]], // Amount must be greater than 0
      cardNumber: [{ value: '', disabled: true }], // Pre-filled and disabled
      cvv: [{ value: '', disabled: true }], // Pre-filled and disabled
      expiryDate: [{ value: '', disabled: true }] // Pre-filled and disabled
    });
  }

 

  // Fetch credit card details
  fetchCreditCardDetails(): void {
    const phoneNumber = this.sharedService.getphoneNumber();
    if (!phoneNumber) {
      alert('Phone number not available!');
      return;
    }

    this.apiService.getCreditCardDetails(phoneNumber).subscribe({
      next: (details) => {
        this.creditCardDetails = details;
        this.showModal = true;
        console.log(details);
      },
      error: (err) => {
        console.error('Error fetching credit card details:', err);
        alert('Unable to fetch credit card details. Please try again later.');
      },
    });
  }

  // Close modal
  closeModal(): void {
    this.showModal = false;
  }

  // Show transaction form
  makeTransaction(): void {
    this.showTransactionForm = true;
  }

  // Handle transaction type selection
  selectTransactionType(type: string): void {
    this.transactionForm.patchValue({ transactionType: type });

    if (type === 'withdraw') {
      // Pre-fill card details if the user selects 'withdraw'
      this.transactionForm.patchValue({
        cardNumber: this.creditCardDetails?.cardNumber || '',
        cvv: this.creditCardDetails?.cvv || '',
        expiryDate: this.creditCardDetails?.expDate || ''
      });
    }
  }

  // Submit transaction
  submitTransaction(): void {
    if (this.transactionForm.invalid) {
      alert('Please fill all required fields correctly.');
      return;
    }

    const phoneNumber = this.sharedService.getphoneNumber();
    if (!phoneNumber) {
      alert('Phone number not available!');
      return;
    }

    const transactionData = {
      amount: this.transactionForm.value.amount,
      transactionType: this.transactionForm.value.transactionType === 'repay' ? 'Credit' : 'Debit',
      phoneNumber: phoneNumber
    };

    this.apiService.makeTransaction(transactionData).subscribe({
      next: (response) => {
        console.log('Transaction successful:', response);
        alert('Transaction successful!');
        this.showTransactionForm = false;
        this.fetchCreditCardDetails(); // Refresh credit card details
      },
      error: (err) => {
        console.error('Error making transaction:', err);
        alert('Unable to make transaction. Please try again later.');
      },
    });
  }

 

  closeTransactionHistory() {
    this.showTransactions = false;
  }

  // Close transaction form
  closeTransactionForm(): void {
    this.showTransactionForm = false;
    this.transactionForm.reset(); // Reset the form
  }

  // Fetch transactions
  fetchTransactions(): void {
    const phoneNumber = this.sharedService.getphoneNumber();
    if (!phoneNumber) {
      alert('Phone number not available!');
      return;
    }

    this.apiService.getTransactionsByPhoneNumber(phoneNumber).subscribe({
      next: (transactions) => {
        this.transactions = transactions;
        this.showTransactions = true;
        console.log('Transactions:', transactions);
      },
      error: (err) => {
        console.error('Error fetching transactions:', err);
        alert('Unable to fetch transactions. Please try again later.');
      },
    });
  }
}