import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BarcodeformPage } from './barcodeform';

@NgModule({
  declarations: [
    BarcodeformPage,
  ],
  imports: [
    IonicPageModule.forChild(BarcodeformPage),
  ],
})
export class BarcodeformPageModule {}
