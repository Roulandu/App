import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  registerUser(username: HTMLInputElement, password: HTMLInputElement, phonenumber: HTMLInputElement, emailnumber: HTMLInputElement) {
    if (username.value.length == 0) {
      alert("请输入账号");
    } else if (password.value.length == 0) {
      alert("请输入密码");
    } else if (phonenumber.value.length == 0) {
      alert("请输入密码");
    } else if (emailnumber.value.length == 0) {
      alert("请输入邮箱");
    } else if (password.value != password.value) {
      alert("两次输入密码不同，请重新输入");
    } else {

      alert("注册成功");

      localStorage.setItem("name", username.value);
      localStorage.setItem("account", password.value);
      localStorage.setItem("phone", phonenumber.value);
      localStorage.setItem("email", emailnumber.value);

      let modal = this.modalCtrl.create(TabsPage);
      modal.present();
    }
  }
}
