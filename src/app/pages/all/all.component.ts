import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Subscription} from 'rxjs';
import { HttpRequestService } from "../../services/http-request/http-request.service";
import { FavServiceService } from 'src/app/services/fav-service/fav-service.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {

  news: Record<string, any>[] = [];
  subscription: Record<string, Subscription> = {};
  selectedLanguage: { name:string, page: number} = { name: "Angular", page: 1 };
  page: number = 0;
  languages: { img: string, name: string, page: number }[] = [
    { img:"https://cdn.worldvectorlogo.com/logos/angular-icon.svg", name: "Angular", page: 1 },
    { img:"https://cdn.worldvectorlogo.com/logos/react-2.svg", name: "React", page: 1 },
    { img:"https://cdn.worldvectorlogo.com/logos/vue-js-1.svg", name: "VueJs", page: 1 }
  ]

  constructor(
    private request: HttpRequestService, 
    private cd: ChangeDetectorRef,
    private favService: FavServiceService
  ) {
    this.favService.news$.subscribe(value => {
      this.news = value as Record<string, any>[];
    })
  }

  ngOnInit(): void {
    this.news = this.favService.getNews();
  }

  async loadNews($event: any) {
    console.log($event);
    const { name, page } = $event; 
    await this.favService.loadNewsFromServer(name, page);
    this.news = [];
    this.cd.detectChanges();
    this.news = this.favService.getNews();
  }

  onScroll() {
    let { name, page } = this.selectedLanguage;
    page = this.increment(page);
    console.log(page);
    this.subscription['more-news'] = 
      this.request.getSearch(name, page).subscribe((news: Record<string, any>) => {
        const { hits } = news;
        this.news = [ ...this.news, ...hits ];
      });
  }

  onScrollUp() {
    const array = [1,2,3,4];
    array.map(() => {
      this.news.pop();
    });
  }

  private increment(n: number) {
    return n + 1;
  }

}
