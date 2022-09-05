import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavRoutingModule } from './fav-routing.module';
import { CardModule } from "../../components/card/card.module";
import { InfiniteScrollModule } from "ngx-infinite-scroll"
import { FavComponent } from "./fav.component";

@NgModule({
  declarations: [ FavComponent ],
  imports: [
    CommonModule,
    CardModule,
    InfiniteScrollModule,
    FavRoutingModule
  ],
  exports: [ FavComponent ]
})
export class FavModule { }
