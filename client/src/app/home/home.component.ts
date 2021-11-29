import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode: boolean = false;
  // users: any;
  
  // constructor(private http: HttpClient) { }

  constructor() {}

  ngOnInit(): void {
    // this.getUsers();

    // setTimeout(() => {
    //   console.log(this.users);
    // }, 2000);
  }

  registerToogle(){
    this.registerMode = !this.registerMode;
  }

  // getUsers(){
  //   console.log("Inside getUsers()");
  //   this.http.get("https://localhost:5001/api/users").subscribe(users => {
  //     this.users = users
  //   });
  // }

  cancelRegisterMode(event: boolean){
    this.registerMode = event;
  }
}
