import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpenwinePage } from './openwine';

@NgModule({
  declarations: [
    OpenwinePage,
  ],
  imports: [
    IonicPageModule.forChild(OpenwinePage),
  ],
})
export class OpenwinePageModule {}
