import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class YelpService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getResults() {
    return this.getResults;
  }

  getIPcoordinates(): Observable<any> {
    return this.http.get<any>('https://ipinfo.io/?token=4440474e851c76');
  }

  getYelpReviews(id: string): Observable<any> {
    return this.http.get(`./getbusinessreviews?id=${id}`);
  }

  getYelpDetails(id: string): Observable<any> {
    return this.http.get(`./getbusinessdetails?id=${id}`);
  }

  getYelpResults(
    term: string,
    category: string,
    distance: number,
    location: string,
    autoDetect: boolean
  ): Observable<any> {
    if (autoDetect) {
      return this.http.get('https://ipinfo.io/?token=4440474e851c76').pipe(
        switchMap((coordinates: any) => {
          let coord = coordinates['loc'].split(',');
          let lat = coord[0];
          let lng = coord[1];
          return this.http.get<any>(
            `./getyelpresults?term=${term}&latitude=${lat}&longitude=${lng}&categories=${category}&radius=${distance}`
          );
        }),
        catchError((error) => of({ error: error }))
      );
    } else {
      return this.http
        .get('./getgeocoordinates?location=' + location)
        .pipe(
          switchMap((coordinates: any) => {
            let lat = coordinates.lat;
            let lng = coordinates.lng;
            return this.http.get<any>(
              `./getyelpresults?term=${term}&latitude=${lat}&longitude=${lng}&categories=${category}&radius=${distance}`
            );
          }),
          catchError((error) => of({ error: error }))
        );
    }
  }
}
