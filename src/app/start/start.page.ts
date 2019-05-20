import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  constructor(public socketService: SocketService) {
    console.log(socketService);
  } 

  ngOnInit() {
  }

   
  ionViewWillLeave() {
    if(!this.socketService.gameIsStarted)
        this.socketService.leave();
  }


}
