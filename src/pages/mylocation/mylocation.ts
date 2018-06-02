import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Geolocation} from "@ionic-native/geolocation";


// baidu map
declare var BMap;

@IonicPage()
@Component({
  selector: 'page-mylocation',
  templateUrl: 'mylocation.html',
})
export class MylocationPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public geoLocation: Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MylocationPage');
  }

  ionViewDidEnter() {
    this.geoLocation.getCurrentPosition({
      maximumAge: 0,
      timeout: 30000,
      enableHighAccuracy: true
    }).then(
      reponse=>{

        let x = reponse.coords.longitude;
        let y = reponse.coords.latitude;
        let ggPoint = new BMap.Point(x,y);

        //地图初始化
        var bm = new BMap.Map("map_location",{enableMapClick: true, enableAutoResize: true});
        bm.centerAndZoom(ggPoint, 15);
        bm.addControl(new BMap.NavigationControl());


        //坐标转换完之后的回调函数
        let translateCallback = function (data){
          if(data.status === 0) {
            var marker = new BMap.Marker(data.points[0]);
            bm.addOverlay(marker);
            bm.setCenter(data.points[0]);
          }
        }

        setTimeout(function(){
          var convertor = new BMap.Convertor();
          var pointArr = [];
          pointArr.push(ggPoint);
          convertor.translate(pointArr, 1, 5, translateCallback)
        }, 1000);
      }
    ).catch(error=>{
      alert('Error getting location:' + error);
    });
  }

}
