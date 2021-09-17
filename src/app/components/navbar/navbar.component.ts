import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase'
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  subs: Subscription[] = [];
  user: any;
  userEmail: string;
  currentUser: User = {};

  constructor(
    private auth: AuthService,
    private router: Router) 
    { }

  ngOnInit(): void {

    this.subs.push(
      this.auth.getUser().subscribe(user => {
        this.user = user;
        // console.log("nav user " + JSON.stringify(this.user));
        // this.getCurrentUser();
      })
    );

    // this.subs.push(
    //   this.auth.getCurrentUser().subscribe(user => {
        
    //     // console.log("yyyyyyy",user);
        
    //     const cUser: User = {
    //       email: user[0].payload.val(),
    //       status: user[1].payload.val(),
    //       username: user[2].payload.val(),
    //     }
    //     // console.log("ttttttttt" + JSON.stringify(cUser));
    //     this.currentUser = cUser;
    //   })
    // );
    
  }

  ngOnDestroy():void {
    this.subs.forEach(s => s.unsubscribe());
  }

  getCurrentUser() {
    
    console.log("uid " + this.user?.uid);
    this.subs.push(this.auth.getUserById(this.user?.uid).subscribe(user => {
      const data = user.data();
      console.log("data " + data);
      
      if (data) {
      this.currentUser.email = data['email'];
      this.currentUser.username = data['username'];
      this.currentUser.status = data['status'];
      }
    }));
  }

  logOut() {
    this.auth.logOut();
  }

}
