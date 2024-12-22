import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private http:HttpClient, private apiService:ApiService){}


    

    checkCardLimit()
    {
      const newPost = { title: 'New Post', body: 'This is a new post' };
      this.apiService.getCardLimit().subscribe({
        next: () => {
          console.log('Post created:');
          
        },
        error: (err) => {
          console.error(err);
         
        },
      });
    }
}
