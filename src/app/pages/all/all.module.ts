import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { AllRoutingModule } from './all-routing.module';
import { CardModule } from "../../components/card/card.module";
import { InfiniteScrollModule } from "ngx-infinite-scroll"
import { SelectModule } from 'src/app/components/select/select.module';
import { AllComponent } from "./all.component"

@NgModule({
  declarations: [AllComponent],
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    AllRoutingModule,
    InfiniteScrollModule,
    SelectModule
  ],
  exports: [AllComponent]
})
export class AllModule { }
