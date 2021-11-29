import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  // loggedIn: boolean;
  // making the account service public to get access to currentUser$ of account service
  // and make use of it in html file directly
  // hence eliminating the use of currentUser$ in this class
  // currentUser$: Observable<User>;

  // constructor(private accountService: AccountService) { }
  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    // this.getCurrentUser();
    // this.currentUser$ = this.accountService.currentUser$;
  }

  login(){
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
      // this.loggedIn = true;
      console.log(this);
    }, error => {
      console.log(error)
    });
  }


  logout(){
    this.accountService.logout();
    // this.loggedIn = false;
    console.log(this);
  }

  // getCurrentUser(){
  //   this.accountService.currentUser$.subscribe(user => {
  //     this.loggedIn = !!user;
  //   }, error => console.log(error));
  // }
}
