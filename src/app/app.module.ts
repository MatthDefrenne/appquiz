import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule } from '@angular/common/http';
import { SocketService } from './socket.service';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import {
  ROUND_PROGRESS_DEFAULTS
  } from 'angular-svg-round-progressbar';


import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { SafeHtmlPipe } from './safe-html.pipe';
import { LooserComponent } from './looser/looser.component';
import { WinnerComponent } from './winner/winner.component';

const config: SocketIoConfig = { url: 'ws://quizbattleroyale.herokuapp.com', options: {} };

@NgModule({
  declarations: [AppComponent, SafeHtmlPipe, LooserComponent, WinnerComponent],
  entryComponents: [LooserComponent, WinnerComponent],
  imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule, RoundProgressModule, HttpClientModule, SocketIoModule.forRoot(config)],
  providers: [
    StatusBar,
    SocketService,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
