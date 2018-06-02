import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, Platform} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {RegisterPage} from "../register/register";
import {BackButtonService} from "../../services/backButton.service";
import {HttpClient} from "@angular/common/http";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              private backButtonService: BackButtonService,
              private platform: Platform,
              private http: HttpClient) {
    this.platform.ready().then(() => {
      this.backButtonService.registerBackButtonAction(null);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  logIn(username: HTMLInputElement, password: HTMLInputElement) {
    if (username.value.length == 0) {
      alert("请输入账号");
    } else if (password.value.length == 0) {
      alert("请输入密码");
    } else {
      this.http.get("assets/data/user.json")
        .subscribe(data => {
          let flag = 0;
          for (let i = 0; i < data["users"].length; i++) {
            let msg = data["users"][i];
            if (username.value == msg["name"]) {
              if (password.value == msg["psd"]) {
                alert("登陆成功");
                localStorage.setItem("name", msg["nickname"]);
                localStorage.setItem("account", msg["name"]);
                localStorage.setItem("phone", msg["phone"]);
                localStorage.setItem("email", msg["email"]);
                let modal = this.modalCtrl.create(TabsPage);
                modal.present();
              } else {
                flag = 1;
                alert("密码错误");
                break;
              }
              flag = 1;
            }
          }
          if (flag == 0) {
            alert("用户不存在");
          }
        });
    }
  }

  GoToRegister() {
    this.navCtrl.push(RegisterPage)
  }
}
