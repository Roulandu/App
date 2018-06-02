import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ProductTracePage} from "../product-trace/product-trace";


@IonicPage()
@Component({
  selector: 'page-barcodeform',
  templateUrl: 'barcodeform.html',
})
export class BarcodeformPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BarcodeformPage');
  }

  getInfoOfCode(barcode) {
    this.navCtrl.push(ProductTracePage);
  }
}
