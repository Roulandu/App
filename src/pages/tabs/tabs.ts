import {Component, ViewChild} from '@angular/core';

import {HomePage} from '../home/home';
import {MinePage} from "../mine/mine";
import {SettingPage} from "../setting/setting";
import {Platform, Tabs} from "ionic-angular";
import {BackButtonService} from "../../services/backButton.service";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tabRoots: Object[];
  @ViewChild('myTabs') tabRef: Tabs;

  constructor(public backButtonService: BackButtonService,
              private platform: Platform) {
    this.tabRoots = [
      {
        root: HomePage,
        tabTitle: '主页',
        tabIcon: 'home'
      },
      {
        root: MinePage,
        tabTitle: '我的',
        tabIcon: 'cube'
      },
      {
        root: SettingPage,
        tabTitle: '设置',
        tabIcon: 'settings'
      }
    ];
    this.platform.ready().then(() => {
      this.backButtonService.registerBackButtonAction(this.tabRef);
    });
  }
}
