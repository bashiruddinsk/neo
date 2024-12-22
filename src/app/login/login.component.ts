import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private sharedService:SharedService, private fb: FormBuilder, private router:Router,private apiService:ApiService) {}

    
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Numbers only
      password: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Numbers only
    });
  }

  

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { phoneNumber, password } = this.loginForm.value;
      console.log('phoneNumber:', phoneNumber, 'Password:', password);
  
      this.apiService.validateUser(this.loginForm.value).subscribe({
        next: (isValid: boolean) => {
          console.log('Validation response:', isValid);
  
          if (isValid) {
            // Redirect to home page if credentials are valid
            this.router.navigateByUrl('home');
          } else {
            console.log("Invalid username or password");
            alert('Invalid username or password');
          }
        },
        error: (err) => {
          console.error('Error during validation:', err);
          alert('An error occurred during validation');
        },
      });
    }
  }
  
     
}
 
