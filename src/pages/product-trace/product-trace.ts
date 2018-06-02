import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";

// baidu map
declare var BMap;

@IonicPage()
@Component({
  selector: 'page-product-trace',
  templateUrl: 'product-trace.html',
})
export class ProductTracePage {
  listView: Object;
  @ViewChild('map') map_container: ElementRef;
  map: any;//地图对象

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductTracePage');
  }

  ionViewDidEnter() {
    this.http.get("assets/data/route.json")
      .subscribe(data => {
        let position = data["position"];
        // 获取起始点坐标
        let p1 = new Array();
        p1[0] = position["start"]["lng"];
        p1[1] = position["start"]["lat"];
        // 获取中间点坐标
        let p2 = new Array();
        for (let i = 0; i < position["mid"].length; i++) {
          p2[i] = new Array();
          p2[i][0] = position["mid"][i]["lng"];
          p2[i][1] = position["mid"][i]["lat"];
        }
        // 获取结束点坐标
        let p3 = new Array();
        p3[0] = position["end"]["lng"];
        p3[1] = position["end"]["lat"];
        // 绘制地图
        // 百度地图API功能
        let map = new BMap.Map("map_container", {enableMapClick: true, enableAutoResize: true});
        // 设置中心点
        map.centerAndZoom(new BMap.Point((p1[0] + p3[0]) / 2, (p1[1] + p3[1])), 12);
        // 设置类型控件
        //map.addControl(new BMap.MapTypeControl());
        // 设置控件
        map.addControl(new BMap.NavigationControl());
        map.enableScrollWheelZoom(true);//启动滚轮放大缩小，默认禁用
        map.enableContinuousZoom(true);//连续缩放效果，默认禁用
        // 设置起始位置和终止位置和中间路径
        let start = new BMap.Point(p1[0], p1[1]);
        let end = new BMap.Point(p3[0], p3[1]);
        let mid = new Array();
        for (let i = 0; i < p2.length; i++) {
          mid[i] = new BMap.Point(p2[i][0], p2[i][1]);
        }
        // 设置坐标点图标
        let startIcon = new BMap.Icon("assets/icon/5380/66.png", new BMap.Size(24, 24));
        let endIcon = new BMap.Icon("assets/icon/5380/69.png", new BMap.Size(24, 24));
        let midIcon = new BMap.Icon("assets/icon/5380/64.png", new BMap.Size(24, 24));
        let wayPointIconHtml = '<div style="position: absolute; margin: 0px; padding: 0px; width: 36px; height: 40px; overflow: hidden;"><img src="http://api0.map.bdimg.com/images/way-points.png" style="display: none; border:none;margin-left:-11px; margin-top:-35px; "></div>';
        // 驾驶寻路设置
        let driving = new BMap.DrivingRoute(map, {
          renderOptions: {map: map, autoViewport: true},
          onMarkersSet: function (res) {    //标注点完成回调
            //console.info(res);
            let myStart = new BMap.Marker(start, {icon: startIcon});
            map.removeOverlay(res[0].marker); //删除起点
            map.addOverlay(myStart);

            let i = 1;
            for (i; i < res.length - 1; i++) {
              let myP1 = new BMap.Marker(mid[i - 1], {icon: midIcon});
              //res[i].Pm.Yc.innerHTML = wayPointIconHtml;//删除途经点
              map.addOverlay(myP1);
            }

            let myEnd = new BMap.Marker(end, {icon: endIcon});
            map.removeOverlay(res[res.length - 1].marker);//删除终点
            map.addOverlay(myEnd);
          }
        });
        // 寻路画线
        driving.search(start, end, {waypoints: mid});

        //勾画底部
        let describe = data["describe"];
        for (let i = 0; i < data["describe"].length; i++) {
          for (let j = 0; j < data["describe"][i]["detail"].length; j++) {
            let colorNum = Math.floor(Math.random() * 7 + 1);
            let color: string;
            switch (colorNum) {
              case 1:
                color = 'red';
                break;
              case 2:
                color = 'yellow';
                break;
              case 3:
                color = 'orange';
                break;
              case 4:
                color = 'blue';
                break;
              case 5:
                color = 'lightblue';
                break;
              case 6:
                color = 'bluegray';
                break;
              case 7:
                color = 'green';
                break;
            }
            data["describe"][i]["detail"][j]["color"] =
              ' timeline-thumb' +
              ' bg-color-' + color +
              ' timeline-icon';
          }
        }
        this.listView = describe;
      });
  }
}
