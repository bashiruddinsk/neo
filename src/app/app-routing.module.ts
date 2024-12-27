import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { TransactionComponent } from './transaction/transaction.component';
import { CardHolderDetailsComponent } from './card-holder-details/card-holder-details.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'login', component:LoginComponent},
  {path:'home',component:HomeComponent},
  { path: 'transactions', component: TransactionComponent },
  { path: 'card-holder-details', component: CardHolderDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
