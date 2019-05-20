import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SocketService } from './socket.service'
import { BattleGuardService } from './guards/battle-guard.service';
import { StartGuardService } from './guards/start-guard.service';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'battle', loadChildren: './battle/battle.module#BattlePageModule', canActivate: [BattleGuardService] },
  { path: 'ranking', loadChildren: './ranking/ranking.module#RankingPageModule' },
  { path: 'start', loadChildren: './start/start.module#StartPageModule', canActivate: [StartGuardService]},
  { path: 'topic', loadChildren: './topic/topic.module#TopicPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
