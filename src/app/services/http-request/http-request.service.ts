import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { api } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  constructor(private http: HttpClient) {
  }

  getSearch(language: string, page: number) {
    const module = `${api}?query=${language}&page=${page}`;
    return this.http.get(module);
  }
}
