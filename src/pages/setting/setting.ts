import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {InfoPopOverPage} from "../info-pop-over/info-pop-over";

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  UserName: String;
  UserAccount: String;
  UserPhoneNumber: String;
  UserEmail: String;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
    this.UserName = localStorage.getItem("name");
    this.UserAccount = localStorage.getItem("account");
    this.UserEmail = localStorage.getItem("email");
    this.UserPhoneNumber = localStorage.getItem("phone");
  }

  logOut() {
    let modal = this.modalCtrl.create(LoginPage);
    modal.present();
  }

  getinfo() {
    this.navCtrl.push(InfoPopOverPage);
  }

}
