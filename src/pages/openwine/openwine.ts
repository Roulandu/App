import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {BLE} from "@ionic-native/ble";

/**
 * Generated class for the OpenwinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-openwine',
  templateUrl: 'openwine.html',
  providers: [BLE]
})
export class OpenwinePage {
  devices: any;
  isScanning: boolean;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ble: BLE) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpenwinePage');
  }

  openDevice(device) {
    let serviceUUID = "ffe0";
    let characteristicUUID = "ffe1";
    this.ble.connect(device["id"]).subscribe(
      peripheralData => {
        alert("连接成功");
        this.ble.writeWithoutResponse(device["id"], serviceUUID, characteristicUUID, this.stringToBytes('0501111111200b2356c8')).then(
          success => {
            alert("发送成功");
          },
          fail => {
            alert("发送失败");
          });
        this.ble.startNotification(device["id"], serviceUUID, characteristicUUID).subscribe(
          data=> {
            alert("接收成功,接收消息为:"+this.bytesToString(data));
            this.ble.disconnect(device["id"]).then(
              success=>{
                alert("已断开连接")
              },fail=>{
                alert("断开连接失败")
              });
          },
          error=>{
            alert("未接收到消息");
            this.ble.disconnect(device["id"]).then(
              success=>{
                alert("已断开连接")
              },fail=>{
                alert("断开连接失败")
              });
          }
        );
      },
      peripheralData => {
        alert("连接失败,请检查是否打开蓝牙或选择正确设备");
      });
  }

  //扫描设备
  scanDevice() {
    console.log("Scanning Started");
    this.devices = [];
    this.isScanning = true;
    this.ble.enable(); //开启蓝牙授权
    this.ble.startScan([]).subscribe(devices => {
      this.devices.push(devices);
    });
    setTimeout(() => {
      this.ble.stopScan().then(() => {
        console.log("Scanning has stopped");
        console.log(JSON.stringify(this.devices))
        this.isScanning = false;
      });
    }, 3000);
  }

  //将字符串转换成字节流 发送用
  stringToBytes(string) {
    var array = new Uint8Array(string.length);
    for (var i = 0, l = string.length; i < l; i++) {
      array[i] = string.charCodeAt(i);
    }
    return array.buffer;
  }

  //字节流转换字符串 接收用
  bytesToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
  }
}
