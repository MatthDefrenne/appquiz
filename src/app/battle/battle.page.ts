import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { SocketService } from '../socket.service';
import { SafeHtmlPipe } from '../safe-html.pipe';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { Storage } from '@ionic/storage';

const TIMER = 5;

@Component({
  selector: 'app-battle',
  templateUrl: './battle.page.html',
  styleUrls: ['./battle.page.scss'],
})
export class BattlePage implements OnInit {

  radius: number = 45;
  stroke: number = 5;


  constructor(private http: HttpClient, public alertController: AlertController, public socketService: SocketService, private sanitized: DomSanitizer, private storage: Storage) { 
    setTimeout(() => {
      this.socketService.gameWillBeging = false;
    }, 5000);
    this.socketService.life = 3;
  }

  ngOnInit() {
    
  }


  selectAnswer(answer) {

    this.presentAlert();

    if(!this.socketService.questionTime)
      this.socketService.selectedAnswer = answer;
  }

  ngAfterViewInit() {
  }


  ionViewWillLeave() {
      this.socketService.leave()
      clearInterval(this.socketService.intervalTemp);
  } 


  ionViewWillUnload() {
    this.socketService.leave()
    clearInterval(this.socketService.intervalTemp);
  }


  async hasAlreadySeeTheAlert() {
    this.storage.get('first_alert').then((val) => {
      return val === "true" ? "true" : "false";
    });
  }

  async presentAlert() {
    let first_alert = await this.hasAlreadySeeTheAlert() as any;

   
    const alert = await this.alertController.create({
      subHeader: 'Wait a minute',
      message: 'Your answer will be validated at the end of the counter, you can change it at any time.',
      buttons: ['OK!']
    });

    if(first_alert === "false" || typeof first_alert === undefined) {
      this.storage.set('first_alert', "true");
      await alert.present();
    }
  }


}
