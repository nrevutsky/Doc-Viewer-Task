import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { ViewerComponent } from './viewer.component';
import {ViewerRoutingModule} from "./viewer-routing.module";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [
    ViewerComponent
  ],
  imports: [
    CommonModule,
    ViewerRoutingModule,
    HttpClientModule,
    NgOptimizedImage,
  ]
})
export class ViewerModule { }
