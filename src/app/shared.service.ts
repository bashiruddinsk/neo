import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  phoneNumber:number | undefined;
  password:string |undefined;
  
  setData(phoneNumber: number, password: string) {
    this.phoneNumber=phoneNumber
    this.password=password
  }
  getphoneNumber()
  {
    return this.phoneNumber
  }
  
  getPassword()
  {
    return this.password
  }

}
