import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from 'ionic-angular';

import { User } from '../../models/user';
import { UserService } from '../../services/user';
import { HomePage } from '../home/home';



@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html',
})
export class LogInPage {
  public logInError:boolean = false;
  public user:User = {email: ''};
  

  constructor (private userService:UserService, private navController:NavController) {}

  logIn (form:NgForm) {
    this.logInError = false
    this.userService.logIn(this.user).then((authSucces:boolean) => {
      if (authSucces) {
        this.navController.push(HomePage);
      } else {
        this.logInError = true;
      }
      form.reset();
    })
  }
}
