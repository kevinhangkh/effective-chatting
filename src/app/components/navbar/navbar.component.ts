import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase'
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: any;
  userEmail: string;
  currentUser: User = {};

  constructor(
    private auth: AuthService,
    private router: Router) 
    { }

  ngOnInit(): void {


    this.auth.getUser().subscribe(user => {
      this.user = user;
      console.log("nav user " + this.user);
      this.getCurrentUser();
    });
    
  }

  getCurrentUser() {
    
    console.log("uid " + this.user?.uid);
    this.auth.getUserById(this.user?.uid).subscribe(user => {
      const data = user.data();
      console.log("data " + data);
      
      if (data) {
      this.currentUser.email = data['email'];
      this.currentUser.username = data['username'];
      this.currentUser.status = data['status'];
      }
    })
  }

  logOut() {
    this.auth.logOut();
  }

}
