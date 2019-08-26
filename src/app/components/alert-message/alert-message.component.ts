import { Component, OnInit, Input } from '@angular/core';

/** Interfaces */
import { MessageI, MessageType } from './../../interfaces/message.interface';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent implements OnInit {

  newMessage: MessageI;
  displayNone: boolean;
  messageType: any;
  @Input('autoClose') autoClose: boolean;
  @Input('message') set message(message: MessageI) {
    this.displayNone = false;
    this.newMessage = message;
    if (this.autoClose && this.newMessage) {
      setTimeout(() => this.displayNone = true, 5000);
    }
  }

  constructor() {
    this.displayNone = false;
    this.messageType = MessageType;
  }

  ngOnInit() {}

}
