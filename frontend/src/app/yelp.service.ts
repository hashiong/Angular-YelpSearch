import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YelpService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient){ }
    
  getYelpResults(): Observable<any> {
    return this.http.get("http://localhost:8000/getyelpresults?term=food&latitude=34&longitude=-118&categories=all&radius=10000")
  }
}
