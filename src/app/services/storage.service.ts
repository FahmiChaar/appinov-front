import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  isReady = new BehaviorSubject(false)
  private _storage: Storage | null = null;
  constructor(
    private storage: Storage
  ) {}

  async init() {
    const storage = await this.storage.create();
    console.log('Storage created')
    this._storage = storage;
    this.isReady.next(true)
  }

  public set(key: string, value: any) {
    return this._storage?.set(key, value);
  }

  public async get(key) {
    return await this._storage?.get(key);
  }

  public async remove(key) {
    return await this._storage?.remove(key);
  }

  public async clear() {
    await this._storage?.clear()
    console.log('all keys cleared');
  }
}
