import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {ProductTracePage} from "../product-trace/product-trace";


@IonicPage()
@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html',
})
export class MinePage {
  // 接收数据用
  typeList: Object;
  capacityList: Object;
  conditionList: Object;

  pet: string = "puppies";
  isAndroid: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private http: HttpClient,
              platform: Platform) {
    this.isAndroid = platform.is('android');
    this.http.get("assets/data/item-type.json")
      .subscribe(data => {
        let msg = data["type"];
        for (let i = 0; i < msg.length; i++) {
          msg[i]["src"] = 'assets/imgs/wine/' + msg[i]["img"];
        }
        this.typeList = msg;
      });
    this.http.get("assets/data/item-capacity.json")
      .subscribe(data => {
        let msg = data["capacity"];
        for (let i = 0; i < msg.length; i++) {
          msg[i]["src"] = 'assets/imgs/wine/' + msg[i]["img"];
        }
        this.capacityList = msg;
      });
    this.http.get("assets/data/item-condition.json")
      .subscribe(data => {
        let msg = data["condition"];
        for (let i = 0; i < msg.length; i++) {
          msg[i]["src"] = 'assets/imgs/wine/' + msg[i]["img"];
          msg[i]["used"] = msg[i]["use"] ? "已使用" : "未使用";
        }
        this.conditionList = msg;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MinePage');
  }

  getInfoOfProduct(title: any) {
    alert(title.toString());
    this.navCtrl.push(ProductTracePage);
  }

}
