import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from './chat.service';

import { RouterModule } from '@angular/router';
import { SimulationInfoComponent } from './simulation-info/simulation-info.component';

import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ChatMenuComponent } from './chat-menu/chat-menu.component';
import { MatChipsModule } from '@angular/material/chips';
import { DebriefComponent } from './debrief/debrief.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot([]),
    MatExpansionModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
  ],
  declarations: [
    ChatComponent,
    SimulationInfoComponent,
    ChatMenuComponent,
    DebriefComponent,
  ],
  providers: [ChatService],
})
export class AngularBotModule {}
