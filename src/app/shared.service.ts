import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  phoneNumber:number | undefined;
  password:string |undefined;
  cardLimit:number | undefined;
   

  setData(phoneNumber: number, password: string) {
    
    this.phoneNumber=phoneNumber
    this.password=password
    console.log("from setdata shared service -----> "+phoneNumber,password)
  }
  getphoneNumber()
  {
    return this.phoneNumber
  }
  setCardLimit(cardLimit: number)
  {
    this.cardLimit=cardLimit;
  }
  getPassword()
  {
    return this.password
  }

}
