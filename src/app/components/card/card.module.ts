import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateAgoModule } from "../../pipes/date-ago/date-ago.module";
import { ClockModule } from "../../images/clock/clock.module";
import { HeardModule } from "../../images/heard/heard.module";
import { CardComponent } from "./card.component";


@NgModule({
  declarations: [ CardComponent ],
  imports: [
    CommonModule,
    DateAgoModule,
    ClockModule,
    HeardModule
  ],
  exports: [ CardComponent ]
})
export class CardModule { }
