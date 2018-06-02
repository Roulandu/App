import {Component, ViewChild} from '@angular/core';
import {NavController, Slides} from 'ionic-angular';
import {BarcodeformPage} from "../barcodeform/barcodeform";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {ProductTracePage} from "../product-trace/product-trace";
import {OpenwinePage} from "../openwine/openwine";
import {MylocationPage} from "../mylocation/mylocation";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;

  public focusList: any[] = [];

  constructor(public navCtrl: NavController,
              private barcodeScanner: BarcodeScanner) {
    this.createFocusList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.slides.autoplayDisableOnInteraction = false;
  }

  ionViewDidEnter() {
    this.slides.startAutoplay();
  }

  ionViewDidLeave() {
    //this.slides.stopAutoplay();
  }

  private createFocusList(length: number = 6) {
    for (let i = 1; i < length; i++) {
      this.focusList.push({
        url: 'assets/imgs/img/' + i.toString() + '.jpg'
      });
    }
    //alert(this.focusList);
  }

  ScanOneScan() {
    this.barcodeScanner.scan().then(barcodeData => {
      //alert(barcodeData);
      this.navCtrl.push(ProductTracePage);
    }).catch(err => {
      //alert(err);
    });
  }

  openForm() {
    this.navCtrl.push(BarcodeformPage);
  }

  openWine() {
    this.navCtrl.push(OpenwinePage);
  }

  openLocation() {
    this.navCtrl.push(MylocationPage);
  }
}
