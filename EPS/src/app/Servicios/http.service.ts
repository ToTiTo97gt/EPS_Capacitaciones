import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CapacitorHttp } from '@capacitor/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private httpClient: HttpClient, private platform: Platform) { }

  get(url: string, token?: string): Observable<any> {
    url = url.trim();
    var headers: any;
    headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers = { ...headers, 'Authorization': `${token}` };
    }
    if (this.platform.is('capacitor') && url.startsWith('http://')) {
      return new Observable<any>((observer) => {
        CapacitorHttp.get({ url, headers: headers })
          .then((response) => {
            if (response.status >= 200 && response.status < 300) {
              observer.next(response.data);
              observer.complete();
            } else {
              throw new Error(response.data);
            }
          })
          .catch(error => {
            console.error(`Error occurred in GET ${url}: ${JSON.stringify(error)}`);
            observer.next(undefined); // Devuelve undefined en caso de error
            observer.complete();
          });
      });
    } else {
      return this.httpClient.get(url, { headers: headers }).pipe(
        catchError((x) => {
          console.error(`Error occurred in GET ${url}`);
          return of(undefined); // Devuelve undefined en caso de error
        })
      );
    }
  }

  getPDF(url: string, token?: string): Observable<any> {
    url = url.trim();
    var headers: any;
    headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers = { ...headers, 'Authorization': `${token}` };
    }
    if (this.platform.is('capacitor') && url.startsWith('http://')) {
      return new Observable<any>((observer) => {
        CapacitorHttp.get({ url, headers: headers, responseType: 'blob' })
          .then((response) => {
            if (response.status >= 200 && response.status < 300) {
              observer.next(response.data);
              observer.complete();
            } else {
              throw new Error(response.data);
            }
          })
          .catch(error => {
            console.error(`Error occurred in GET ${url}: ${JSON.stringify(error)}`);
            observer.next(undefined); // Devuelve undefined en caso de error
            observer.complete();
          });
      });
    } else {
      return this.httpClient.get(url, { headers: headers, responseType: 'blob' }).pipe(
        catchError((x) => {
          console.error(`Error occurred in GET ${url}`);
          return of(undefined); // Devuelve undefined en caso de error
        })
      );
    }
  }

  post(url: string, data: any, token?: string): Observable<any> {
    url = url.trim();
    var headers: any;
    headers = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headers = { ...headers, 'Authorization': `${token}` };
    }
    // Agregar el token al encabezado si está presente

    if (this.platform.is('capacitor') && url.startsWith('http://')) {
      return new Observable<any>((observer) => {
        CapacitorHttp.post({ url: url, data: JSON.stringify(data), headers: headers })
          .then((response) => {
            observer.next(response.data);
            observer.complete();
          })
          .catch(error => {
            console.error(`Error occurred in POST ${url}: ${JSON.stringify(error)}`);
            observer.next(undefined); // Devuelve undefined en caso de error
            observer.complete();
          });
      });
    } else {
      return this.httpClient.post(url, data, { headers: headers }).pipe(
        catchError(() => {
          console.error(`Error occurred in POST ${url}`);
          return of(undefined); // Devuelve undefined en caso de error
        })
      );
    }
  }
}