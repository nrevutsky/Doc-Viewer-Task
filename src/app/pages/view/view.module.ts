import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view.component';
import { ViewRoutingModule } from "./view-routing.module";
import { FormsModule } from "@angular/forms";



@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    ViewRoutingModule,
    FormsModule,
  ]
})
export class ViewModule { }
