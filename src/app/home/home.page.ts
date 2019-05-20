import { Component } from '@angular/core';
import { SocketService } from '../socket.service';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {




  constructor(public socketService: SocketService, public alertController: AlertController, private storage: Storage) {
      this.socketService.gameIsStarted = false;
      this.socketService.hasEnteredInLobby = false;
      this.socketService.max = 60;
      this.socketService.reintializeGameRules();
  }

 


}
