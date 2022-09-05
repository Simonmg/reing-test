import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import {FavServiceService} from 'src/app/services/fav-service/fav-service.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnChanges {
  @Input() content: any;
  @Input() index: any;

  constructor(
    private favService: FavServiceService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges({ content, index }: SimpleChanges): void {
    this.index = index.currentValue; 
    this.content = content.currentValue;
  }

  toggleFav() {
    this.content.fav = !this.content.fav 
    if (this.content.fav) {
      this.favService.setFav(this.content);
    }
  }

  goToLink(url: string) {
    (window as Window).open(url, "_blank");
  }

}
