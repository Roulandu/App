import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductTracePage } from './product-trace';

@NgModule({
  declarations: [
    ProductTracePage,
  ],
  imports: [
    IonicPageModule.forChild(ProductTracePage),
  ],
})
export class ProductTracePageModule {}
