import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoPopOverPage } from './info-pop-over';

@NgModule({
  declarations: [
    InfoPopOverPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoPopOverPage),
  ],
})
export class InfoPopOverPageModule {}
