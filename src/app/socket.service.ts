import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs/Observable';
import { WinnerComponent } from './winner/winner.component';
import { LooserComponent } from './looser/looser.component';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

const TIMER = 5;

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  current: number = 0;
  max: number = 60;
  public game: any;
  gameWillBeging = false;
  gameIsStarted = false;
  hasEnteredInLobby = false;
  countdown = 3;
  interval: any;
  index = 0;
  selectedAnswer = {
    id: null,
    title: null
  }
  life = 3;
  questionTime = false;
  intervalTemp: any;
  counterIsLoading = true;
  questionInterval: any;
  timerQuestionTimeInterval = TIMER;
  loading: any;
  alert = false;
  timeout: any;
  constructor(public alertController: AlertController, public socket: Socket, public navController: NavController, private modalController: ModalController, private toastController: ToastController, public loadingController: LoadingController) {
    this.game = {}
    this.socket.on('start', () => {
      this.gameWillBeging = true;
      this.interval = setInterval(() => {
          this.countdown--;
      }, 1000)
      this.startTheGame();
    })
    this.onDisconnected();
    this.onPlayerWin();
  }


  startTheGame() {
    setTimeout(() => {
      clearInterval(this.intervalTemp);
      this.InitializeTimer();
      clearInterval(this.interval);
      this.gameIsStarted = true;
      this.hasEnteredInLobby = false;
      this.navController.navigateRoot('/battle');
      this.countdown = 3;
    }, 3000)
  }


  reintializeGameRules() {
    console.log('reintializeGameRules');
    clearInterval(this.interval);
    clearInterval(this.intervalTemp);
    clearInterval(this.questionInterval);
    clearTimeout(this.timeout);
    this.current = 0;
    this.max = 60;
    this.life = 3;
    this.countdown = 3;
    this.index = 0;
    this.timerQuestionTimeInterval = TIMER;
    this.gameWillBeging = false;
    this.gameIsStarted = false;
    this.hasEnteredInLobby = false;
    this.counterIsLoading = true;
    console.log('reintializeGameRules', this.interval, this.intervalTemp, this.max, this.current);

  }

  wantToJoin(topicId) {
      this.socket.emit('onJoinGame', {topic: topicId});
      this.getGame().subscribe((game: any) => {
        this.game = game;
        this.counterIsLoading = false;
       });
    this.hasEnteredInLobby = true;
    this.navController.navigateForward('/start');
    this.alert = false;
  }

  getGame() {
    let observable = new Observable(observer => {
      this.socket.on('game-stats', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  onPlayerWin() {
    this.socket.on('onPlayerWin', () => {
      console.log('Player win');
      this.presentModalEnd(true);
    })
  }


  async presentModalEnd(winner) {
    const modal = await this.modalController.create({
      component: winner ? WinnerComponent : LooserComponent,
    });
    this.gameWillBeging = false;
    this.gameIsStarted = false;
    this.hasEnteredInLobby = false;
    this.reintializeGameRules();
    this.navController.navigateBack('/home').then(() => {
      return modal.present();
    })
  }


  onPlayerLose() {
    this.presentModalEnd(false);
  }

  async presentToastWin() {
    const toast = await this.toastController.create({
      message: 'Good answer. Keep going!',
      duration: 3000,
      position: 'top',
      cssClass: "my-custom-class-good"
    });
    toast.present();
  }


  async presentToastLost() {
    const toast = await this.toastController.create({
      message: 'Wrong answer, you lose 1 life!',
      duration: 3000,
      position: 'top',
      cssClass: "my-custom-class-wrong"
    });
    toast.present();
  }

  leave() {
    console.log('You will leave, sucker');
    this.socket.emit('playerLeave', this.game);
    this.reintializeGameRules();
  }

  async presentAlertDisconnected() {
    const alert = await this.alertController.create({
      subHeader: 'Disconnected!',
      message: 'You have been disconnected, please reconnect!',
      buttons: ['OK']
    });

    await alert.present();
  }


  onDisconnected() {
    this.socket.on('disconnect', () => {
      if(this.gameIsStarted || this.hasEnteredInLobby) {
          this.navController.navigateRoot('/home');
      }
      this.reintializeGameRules();
      if(!this.alert)
        this.presentAlertDisconnected()
      
      this.alert = true;
    })
  }

  InitializeTimer() {

    this.intervalTemp = setInterval(function(){
      if(this.current >= this.max) {
        this.checkAnswer();
        this.current = 0;
        this.max = this.max - 3;
        this.questionTime = true;
        clearInterval(this.intervalTemp);
        this.startReviewQuestion();
        console.log('answer!');
      }
        this.current++
        console.log('ping', this.interval, this.intervalTemp);
      
      }.bind(this), 1000);
  }

  checkAnswer() {
    if(this.game.questions[this.index].correct_answer == this.selectedAnswer.title) {
      console.log('Good responses');
      this.presentToastWin();
    }
    else if((this.life - 1) == 0) {
      console.log('You loose 1 life');
      setTimeout(() => {
        this.leave();
        this.onPlayerLose();
      }, 2000)
    }
    else {
      this.presentToastLost();
      console.log('Wrong response');
      this.life -= 1;
    }
  }

  startReviewQuestion() {
    this.questionInterval = setInterval(() => {
        this.timerQuestionTimeInterval--;
    }, 1000)
   this.timeout = setTimeout(() => {
      this.questionTime = false;
      this.timerQuestionTimeInterval = TIMER;
      this.selectedAnswer.id = null;
      this.index++;
      this.InitializeTimer()
      clearInterval(this.questionInterval);
   }, TIMER * 1000)
  }

  tg() {
    console.log('yo');
  }
}
