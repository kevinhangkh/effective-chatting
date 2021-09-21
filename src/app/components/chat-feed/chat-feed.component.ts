import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatMessage } from 'src/app/models/chat-message.model';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-feed',
  templateUrl: './chat-feed.component.html',
  styleUrls: ['./chat-feed.component.css']
})
export class ChatFeedComponent implements OnInit, OnDestroy, AfterViewChecked {

  @Input() scrollOrder: Event;

  subs: Subscription[] = [];
  chatMessages: ChatMessage[];
  
  constructor(private chat: ChatService) { }
  
  ngOnInit(): void {

    this.subs.push(this.chat.getMessages().subscribe(messages => {this.chatMessages = messages;}));

    this.subs.push(this.chat.getScrollOrder().subscribe(
      (order) => {
        console.log(order);
        this.scrollToBottom();
      }))
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
  
  scrollToBottom() {
    var scrollable = document.getElementById("scrollable");
    scrollable.scrollTo({
      top: scrollable.scrollHeight - scrollable.clientHeight,
      behavior: "smooth"
    })
  }
    
}
