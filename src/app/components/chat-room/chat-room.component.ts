import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit, AfterViewChecked, AfterViewInit {

  // @ViewChild('scroller') private chatfeed: ElementRef
  sentMessageEvent: Event;

  scroll: ElementRef;
  divTwo: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    // console.log("afterviewchecked");
    
    // this.scrollToBottom();
    // console.log('div one' , this.divOne);
    // console.log('div two' , this.divTwo);
  }

  ngAfterViewInit(): void {
    
  }

  sentMessage(event: Event) {
    console.log("got the message " + event);
    
    this.sentMessageEvent = event;
  }

  // scrollToBottom(): void {

  //   console.log("scroll down");
    
  //   this.chatfeed.nativeElement.scrollTop = 
  //     this.chatfeed.nativeElement.scrollHeight;
  // }

}
