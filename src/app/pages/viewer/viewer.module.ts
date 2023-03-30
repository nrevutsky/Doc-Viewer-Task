import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { ViewerComponent } from './viewer.component';
import {ViewerRoutingModule} from "./viewer-routing.module";



@NgModule({
  declarations: [
    ViewerComponent
  ],
  imports: [
    CommonModule,
    ViewerRoutingModule,
    NgOptimizedImage,
  ]
})
export class ViewerModule { }
