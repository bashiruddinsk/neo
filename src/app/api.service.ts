import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8080'; // Example API

  constructor(private http: HttpClient,private sharedService:SharedService) {}

  

getCreditCardDetails(phoneNumber: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/getCreditCardDetails?phoneNumber=${phoneNumber}`);
}

  validateUser(cardHolder:any):Observable<any>{

    const cardHolderDetails={
        phoneNumber:cardHolder.phoneNumber,
        password:cardHolder.password
    }
    console.log("data--------------->>>"+cardHolderDetails.phoneNumber,cardHolderDetails.password)

    return this.http.post<any>(`${this.apiUrl}/validate`,cardHolderDetails);

  }


  getTransactionsByPhoneNumber(phoneNumber: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/transactions/${phoneNumber}`);
  }

  makeTransaction(transactionData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/transactions`, transactionData);
  }

}
