import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  set(storeName: string, storeBody: any): void {
    window.localStorage.setItem(storeName, JSON.stringify(storeBody));
  }

  get(storeName: string) {
    const result = window.localStorage.getItem(storeName);
    return JSON.parse(result);
  }

  clear(): void {
    window.localStorage.clear();
  }

  remove(storeName: string): void {
    window.localStorage.removeItem(storeName);
  }
}
