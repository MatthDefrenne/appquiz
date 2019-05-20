import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { SocketService } from '../socket.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class StartGuardService implements CanActivate {

  constructor(private socketService: SocketService, private navController: NavController) { }

  canActivate() {
    if(this.socketService.hasEnteredInLobby) {
      return true;
    } else {
      this.navController.navigateRoot('home');
      return false;
    }
  }
}
