import { Component, OnInit } from '@angular/core';
import { FavServiceService } from 'src/app/services/fav-service/fav-service.service';
@Component({
  selector: 'app-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.scss']
})
export class FavComponent implements OnInit {
  news: Record<string, any>[] = [];
  constructor(
    private favService: FavServiceService
  ) {
    this.news = this.favService.getFav();
    this.favService.news$.subscribe(value => {
      this.news = [...this.news, value as Record<string,any>];
    });
  }

  ngOnInit(): void {
  }

}
