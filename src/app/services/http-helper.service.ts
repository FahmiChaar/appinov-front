import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import { StorageService } from './storage.service';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpHelperService {

  API: string = this.appSettings.API;
  constructor(
    private http: HttpClient,
    private appSettings: AppConfigService,
    private storage: StorageService,
  ) { }

  private methods(method: string, url: string, data?: any, options?: any): Observable<any> {
    method = method.toLowerCase();
    options = options || {};
    if (url[0] === '/') {
      url = this.API + url;
    }
    if (method === 'get' || method === 'delete') {
      return this.http[method](url, options);
    } else {
      return this.http[method](url, data, options);
    }
  }

  public request(method: string, url: string, data?: any, options?: any): Observable<any> {
    return from(this.storage.get('token')).pipe(
      mergeMap(token => {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Accept', 'application/json');
        options = { headers };
        if (token) {
          headers = headers.append('Authorization', 'Bearer ' + token);
          options = { headers }
        }
        return this.methods(method, url, data, options)
      })
    )
  }
}