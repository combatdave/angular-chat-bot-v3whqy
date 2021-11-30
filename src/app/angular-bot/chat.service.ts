import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

export class Author {
  constructor(
    public name: string,
    public avatar: string = null,
    public id: number = -1
  ) {
    this.name = name;
    this.avatar = avatar;
    this.id = id;
    if (this.id == -1) {
      this.id = Math.floor(Math.random() * 10000);
    }
    if (this.avatar === null) {
      this.avatar =
        '//gravatar.com/avatar/' +
        (this.id * 1000000).toString(16) +
        '00000?d=robohash';
    }
  }
}
export class Message {
  constructor(public author: Author, public content: string) {}
}

export var userAuthor = new Author(
  'You',
  '//gravatar.com/avatar/000342094500000000000000000?d=retro',
  0
);

var j = [
  {
    actor: 1,
    speech: "Hi, let's introduce ourselves. I am the doctor near the patient",
  },
  {
    actor: 2,
    speech: 'I am nurse 1',
  },
  {
    actor: 3,
    speech: 'I am nurse 2',
  },
  {
    actor: 4,
    speech: 'I am the undersköterska',
  },
  {
    actor: 1,
    speech: "Great, let's begin!",
  },
  {
    actor: 1,
    speech:
      "We have 4 year old Greta, incoming in 1 minute by ambulance. Situation: respiratory distress, B: previously healthy, slight obstructive with previous viral infections, current weight 15kg A: presents with feber 39 degrees past 4 days, coughing. Past 48 hours decreased intake of food and drink, hasn't peed since last night",
  },
  {
    actor: 1,
    speech:
      '... The patient has now entered the emergency room and is on the table.',
  },
  {
    actor: 0,
    speech: 'Please check the airway patency',
  },
  {
    actor: 1,
    speech: 'I hear slight snoring',
  },
  {
    actor: 0,
    speech:
      'The airway is partially obstructed, can you help with a chin lift?',
  },
  {
    actor: 4,
    speech: '*Attaches pulse oxymeter, cardiac cables*',
  },
  {
    actor: 1,
    speech: '*Does chin lift*',
  },
  {
    actor: 1,
    speech: 'The snoring decreases, can Nurse 1 take over the Chin lift?',
  },
  {
    actor: 2,
    speech: '*Takes over chin lift*',
  },
  {
    actor: 0,
    speech: 'Perfect, can you look in the mouth after foreign body or blood?',
  },
  {
    actor: 1,
    speech: '*Opens mouth and examines*',
  },
  {
    actor: 1,
    speech: 'The mouth is clear',
  },
  {
    actor: 0,
    speech: 'Thank you, continue to examine the breathing',
  },
  {
    actor: 1,
    speech:
      '*listens to chest at least 3 points on left side and 3 points on right side*',
  },
  {
    actor: 1,
    speech:
      'It is generally quiet, with a prolonged expirium and slight wheezing. She seems to be breathing fast',
  },
  {
    actor: 0,
    speech: 'Ok, what is her saturation and respiratory rate?',
  },
  {
    actor: 4,
    speech: 'Her saturation is 87% and her respiratory rate is 56',
  },
  {
    actor: 0,
    speech:
      'Low saturation and high respiratory rate. Please give her 15L O2 and start preparing the HFNC if we need it',
  },
  {
    actor: 3,
    speech: 'I will prepare the HFNC',
  },
  {
    actor: 4,
    speech: '*puts on O2*',
  },
  {
    actor: 3,
    speech: '*prepares HFNC*',
  },
  {
    actor: 4,
    speech: '15L oxygen delivered',
  },
  {
    actor: 0,
    speech: 'Is her breathing laboured?',
  },
  {
    actor: 1,
    speech: '*Opens up clothes, looks at chest*',
  },
  {
    actor: 1,
    speech:
      'She has a laboured breathing: Plenty intercostal and suprajugular tretratctions, abdominal breathing',
  },
  {
    actor: 0,
    speech:
      'Ok, so she will tire soon. If she tires more we will have to start the HFNC and call the anesthesiologist.',
  },
  {
    actor: 3,
    speech: 'With 15L O2 on mask saturation is now 94%',
  },
  {
    actor: 1,
    speech:
      "That's all for now, this is the end of the demo! Now we'll see the debriefing.",
  },
];

@Injectable()
export class ChatService {
  convoStep = 0;
  finished = false;
  botIsTyping = false;

  users = [
    userAuthor,
    new Author('Dr 1'),
    new Author('Nurse 1'),
    new Author('Nurse 2'),
    new Author('Undersköterska'),
  ];

  constructor(private router: Router, private ngZone: NgZone) {
    this.doFakeConvo();
  }

  async doFakeConvo() {
    this.convoStep = 0;
    this.nextConvoStep();
  }

  async nextConvoStep() {
    while (1) {
      if (this.convoStep < j.length) {
        var c = j[this.convoStep];
        await this.doConvoStepMessage(c.actor, c.speech);
        this.convoStep += 1;
      } else {
        break;
      }
    }

    this.ngZone.run(() => {
      this.finished = true;
    });
  }

  async doConvoStepMessage(actorId: number, speech: string) {
    if (actorId == 0) {
      await this.doUserInput(speech);
    } else {
      this.ngZone.run(() => {
        this.botIsTyping = true;
      });
      var delayTime = 1500 + speech.length * 10;
      await new Promise((f) => setTimeout(f, delayTime));

      var actor = this.users[actorId];
      var msg = new Message(actor, speech);
      this.conversation.next([msg]);
      this.ngZone.run(() => {
        this.botIsTyping = false;
      });
    }
  }

  async doUserInput(speech: string) {
    await new Promise((f) => setTimeout(f, 600));
    var inputElement = <HTMLInputElement>(
      document.getElementById('chat-text-input')
    );

    var i = 0;

    inputElement.setAttribute('good', 'true');

    while (i < speech.length) {
      inputElement.value += speech[i];
      i++;
      await new Promise((f) => setTimeout(f, 40));
    }
    inputElement.value = speech;

    await new Promise((f) => setTimeout(f, 600));

    var buttonElement = <HTMLButtonElement>(
      document.getElementById('chat-send-button')
    );

    buttonElement.click();
  }

  conversation = new Subject<Message[]>();

  messageMap = {
    Hi: 'Hello',
    'Who are you': 'My name is Agular Bot',
    'What is Angular': 'Angular is the best framework ever',
    default: "I can't understand. Can you please repeat",
  };

  bot = new Author(
    'Bot',
    '//gravatar.com/avatar/0003420900000000000000?d=retro'
  );

  getBotAnswer(msg: string) {
    const botMessage = new Message(this.bot, this.getBotMessage(msg));

    setTimeout(() => {
      this.conversation.next([botMessage]);
    }, 1000);
  }

  getBotMessage(question: string) {
    let answer = this.messageMap[question];
    return answer || this.messageMap['default'];
  }
}
