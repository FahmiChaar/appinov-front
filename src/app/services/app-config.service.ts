import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  API = 'http://localhost:3000'
  constructor() { }
}
