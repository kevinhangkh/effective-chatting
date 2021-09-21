import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {

  // @ViewChild('divComponent2') divComponent1: ElementRef;


  form: FormGroup;
  // message: string = '';

  constructor(private chat: ChatService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      msg: [null, [Validators.required]]
    });

    // var scrollToTopBtn = document.getElementById("scroll-to-top");
    // scrollToTopBtn.addEventListener("click", this.scrollToTop);
  }

  onSubmit(form: FormGroup): void {
    console.log(form.value);
    if (form.value.msg) {
      this.chat.sendMessage(form.value.msg);
      form.reset();
    }
  }

}
