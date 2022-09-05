import { Injectable } from '@angular/core';
import { filter, Subject } from 'rxjs';
import { HttpRequestService } from '../http-request/http-request.service';

@Injectable({
  providedIn: 'root'
})
export class FavServiceService {
  private news: Record<string, any>[] = [];
  private favs: Record<string, any>[] = [];
  private favNews = new Subject();
  private newsSubject = new Subject();
  public readonly favs$ = this.favNews.asObservable().pipe(filter(data => !!data));
  public readonly news$ = this.newsSubject.asObservable().pipe(filter(data => !!data));


  constructor(private http: HttpRequestService) {
    this.loadNewsFromServer("Angular", 1);
  }

  setFav(content: Record<string, any>) {
    this.favs.push(content)
    this.favNews.next(content);
  }

  getFav() {
    return this.favs;
  }

  getNews() {
    return this.news;
  }

  async loadNewsFromServer(lang: string, page: number) {
    const { hits } = await this.http.getSearch(lang, page).toPromise() as Record<string, any>;
    this.news = [];
    this.news = hits.map((value: Record<string, any>) => ({...value, fav: false}));
    this.newsSubject.next(hits);
  }
}
