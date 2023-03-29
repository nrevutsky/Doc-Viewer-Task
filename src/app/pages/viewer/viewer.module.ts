import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewerComponent } from './viewer.component';
import {ViewerRoutingModule} from "./viewer-routing.module";



@NgModule({
  declarations: [
    ViewerComponent
  ],
  imports: [
    CommonModule,
    ViewerRoutingModule,
  ]
})
export class ViewerModule { }
