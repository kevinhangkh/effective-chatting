import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatMessage } from 'src/app/models/chat-message.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit, OnDestroy {

  @Input() chatMessage: ChatMessage;
  userId: string;
  status: string = 'offline';

  subs: Subscription[] = [];

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.userId = this.auth.getUserId();

    this.subs.push(this.auth.getStatusById(this.chatMessage.uid).subscribe(s => this.status = s));
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

}
