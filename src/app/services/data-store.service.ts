import { Injectable } from '@angular/core';

export interface Book {
  id?: number;
  name: string;
  pages: number;
  author: string;
}

type itemsType = 'books'

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  books: Book[] = []
  constructor() { }

  addItem(item: any, items: itemsType) {
    this[items].unshift(item)
    this[items] = [...this[items]]
  }

  updateItem(item: any, items: itemsType) {
    const itemIndex = this[items].findIndex(i => i.id === item.id)
    if (itemIndex > -1) {
      this[items][itemIndex] = item
      this[items] = [...this[items]]
    }
  }

  removeItem({id, index, items}: {id: number; index?: number; items: itemsType}) {
    if (id) {
      const itemIndex = this[items].findIndex(p => p.id === id)
      if (itemIndex > -1) {
        this[items].splice(itemIndex, 1)
        this[items] = [...this[items]]
      }
    }else if (index) {
      this[items].splice(index, 1)
      this[items] = [...this[items]]
    }
  }

}
