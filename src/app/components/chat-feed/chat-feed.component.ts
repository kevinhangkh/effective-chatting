import { AfterViewChecked, AfterViewInit, Component, DoCheck, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatMessage } from 'src/app/models/chat-message.model';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-feed',
  templateUrl: './chat-feed.component.html',
  styleUrls: ['./chat-feed.component.css']
})
export class ChatFeedComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked, DoCheck {

  @Input() scrollOrder: Event;

  subs: Subscription[] = [];
  chatMessages: ChatMessage[];
  
  constructor(private chat: ChatService) { }
  
  ngOnInit(): void {

    this.subs.push(this.chat.getMessages().subscribe(messages => {
      this.chatMessages = messages;
      this.scrollToBottom();
    }));

    this.subs.push(this.chat.getScrollOrder().subscribe(
      (order) => {
        // console.log(order);
        this.scrollToBottom();
      }))

      this.initScroll();
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  ngAfterViewInit(): void {
    // console.log('after view init');

    // this.initScroll();
  }

  ngAfterViewChecked(): void {
  }

  ngDoCheck(): void {
    // console.log('do check');
    
    // this.initScroll();
  }

  initScroll() {
    var scrollable = document.getElementById("scrollable");
    scrollable.scrollTop = scrollable.scrollHeight;
  }
  
  scrollToBottom() {
    var scrollable = document.getElementById("scrollable");
    scrollable.scrollTo({
      top: scrollable.scrollHeight - scrollable.clientHeight,
      behavior: "smooth"
    })
  }
    
}
