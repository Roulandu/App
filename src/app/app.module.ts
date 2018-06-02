import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {BackButtonService} from "../services/backButton.service";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {HttpClientModule} from '@angular/common/http';
import {BLE} from "@ionic-native/ble";
import {Geolocation} from "@ionic-native/geolocation";

import { HomePage } from '../pages/home/home';
import { MinePage } from "../pages/mine/mine";
import { SettingPage } from "../pages/setting/setting";
import { TabsPage } from '../pages/tabs/tabs';

import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {InfoPopOverPage} from "../pages/info-pop-over/info-pop-over";
import {BarcodeformPage} from "../pages/barcodeform/barcodeform";
import {ProductTracePage} from "../pages/product-trace/product-trace";
import {OpenwinePage} from "../pages/openwine/openwine";
import {MylocationPage} from "../pages/mylocation/mylocation";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



@NgModule({
  declarations: [
    MyApp,
    MinePage,
    SettingPage,
    HomePage,
    LoginPage,
    RegisterPage,
    InfoPopOverPage,
    BarcodeformPage,
    ProductTracePage,
    OpenwinePage,
    MylocationPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MinePage,
    SettingPage,
    HomePage,
    LoginPage,
    RegisterPage,
    InfoPopOverPage,
    BarcodeformPage,
    ProductTracePage,
    OpenwinePage,
    MylocationPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BackButtonService,
    BarcodeScanner,
    BLE,
    Geolocation
  ]
})
export class AppModule {}
