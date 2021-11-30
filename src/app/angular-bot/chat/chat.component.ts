import {
  Component,
  OnInit,
  ViewChildren,
  ElementRef,
  QueryList,
  ChangeDetectorRef,
  ViewRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { Author, Message, ChatService, userAuthor } from '../chat.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  inputText: string;
  ChangeDetectionStrategy;

  nurse = new Author(
    'Nurse',
    '//gravatar.com/avatar/00034587632094500000000000000000?d=retro'
  );

  dr1 = new Author('Doctor 1', '//gravatar.com/avatar/746464?d=retro');

  constructor(
    public chatService: ChatService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    // this.messages.push(
    //   new Message(
    //     this.nurse,
    //     "Welcome to the Medagogic training tool! I'm the attending nurse."
    //   )
    //);
    // this.messages.push(new Message(this.dr1, "And I'm the attending doctor."));
    // this.messages.push(
    //   new Message(
    //     this.nurse,
    //     'The patient is presenting with blah blah blah. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu  fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    //   )
    // );
  }

  ngOnInit() {
    this.chatService.conversation.subscribe((val) => {
      this.addNewMessage(val);
      if (this.cdr && !(this.cdr as ViewRef).destroyed) {
        this.cdr.detectChanges();
      }
    });
  }

  addNewMessage(messages: Message[]) {
    this.messages = this.messages.concat(messages);
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.sendMessage();
    }

    if (event.target.value != '') {
      event.target.setAttribute('good', 'true');
    } else {
      event.target.removeAttribute('good');
    }
  }

  sendMessage() {
    var inputElement = <HTMLInputElement>(
      document.getElementById('chat-text-input')
    );

    var msg = inputElement.value;

    if (msg == '') {
      return;
    }

    this.inputText = msg;
    inputElement.value = '';
    this.messages.push(new Message(userAuthor, this.inputText));

    inputElement.removeAttribute('good');

    //this.chatService.getBotAnswer(msg);
  }
}
