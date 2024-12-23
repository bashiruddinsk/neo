import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private http:HttpClient, private apiService:ApiService,private sharedService:SharedService){}
  showModal: boolean = false;
  creditCardDetails: any;

  cardLimit:number | undefined;

  checkCardLimit(): void {
    const phoneNumber = this.sharedService.getphoneNumber();
    if (!phoneNumber) {
        alert('Phone number not available!');
        return;
    }

    this.apiService.getCardLimit(phoneNumber).subscribe({
        next: (response) => {
            console.log('Card Limit:', response);
            this.cardLimit=response;
            this.sharedService.setCardLimit(response.value);
            // Navigate to another page or display the details in the current page
        },
        error: (err) => {
            console.error('Error fetching card limit:', err);
            alert('Unable to fetch card limit. Please try again later.');
        },
    });
}


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

closeModal(): void {
  this.showModal = false;
}
}
