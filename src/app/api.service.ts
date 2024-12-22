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

  // Fetch data from the API
  getCardLimit(): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/getLimit`);
  }

  validateUser(cardHolder:any):Observable<any>{

    const cardHolderDetails={
        phoneNumber:cardHolder.phoneNumber,
        password:cardHolder.password
    }
    console.log("data--------------->>>"+cardHolderDetails.phoneNumber,cardHolderDetails.password)

    return this.http.post<any>(`${this.apiUrl}/validate`,cardHolderDetails);

  }

}
