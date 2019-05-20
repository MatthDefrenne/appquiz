import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {RoundProgressModule} from 'angular-svg-round-progressbar';

import { IonicModule } from '@ionic/angular';

import { BattlePage } from './battle.page';

const routes: Routes = [
  {
    path: '',
    component: BattlePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoundProgressModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BattlePage]
})
export class BattlePageModule {}
