import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  login: {username?: string, password?: string} = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  onLogin(form) {
      console.log(this.login.username);
      console.log(this.login.password);
      (<any>window).NativeInterface.logon(this.login.username,this.login.password);

  }
}
