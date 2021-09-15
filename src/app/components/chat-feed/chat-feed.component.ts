import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatMessage } from 'src/app/models/chat-message.model';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-feed',
  templateUrl: './chat-feed.component.html',
  styleUrls: ['./chat-feed.component.css']
})
export class ChatFeedComponent implements OnInit, OnDestroy {
  
  subs: Subscription[] = [];
  chatMessages: ChatMessage[];
  
  constructor(private chat: ChatService) { }
  
  ngOnInit(): void {
    this.subs.push(this.chat.getMessages().subscribe(messages => {this.chatMessages = messages;}));
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
    
}
