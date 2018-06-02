import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MylocationPage } from './mylocation';

@NgModule({
  declarations: [
    MylocationPage,
  ],
  imports: [
    IonicPageModule.forChild(MylocationPage),
  ],
})
export class MylocationPageModule {}
