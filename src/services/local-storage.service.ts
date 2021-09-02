import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  storeData(key: any, val: any) {
    localStorage.setItem(key, val);
  }
  getData(key: any) {
    localStorage.getItem(key);
  }
  removeData(key: any) {
    localStorage.removeItem(key);
  }
}
