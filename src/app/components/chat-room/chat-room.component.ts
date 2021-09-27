import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {

  sentMessageEvent: Event;

  scroll: ElementRef;
  divTwo: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  sentMessage(event: Event) {
    console.log("got the message " + event);
    
    this.sentMessageEvent = event;
  }

}
