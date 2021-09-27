import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  subs: Subscription[] = [];
  connectedUsers: User[] = [];
  currentUid: string = '';

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.subs.push(this.auth.getConnectedUsers().subscribe(users => this.connectedUsers = users));

    this.currentUid = this.auth.getUserId();
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
}
