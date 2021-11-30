import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatMenuComponent } from './angular-bot/chat-menu/chat-menu.component';
import { ChatComponent } from './angular-bot/chat/chat.component';
import { DebriefComponent } from './angular-bot/debrief/debrief.component';
import { SimulationInfoComponent } from './angular-bot/simulation-info/simulation-info.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'chat' },
  { path: 'chat', component: ChatComponent },
  { path: 'simulation-info', component: SimulationInfoComponent },
  { path: 'chat-menu', component: ChatMenuComponent },
  { path: 'debrief', component: DebriefComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
