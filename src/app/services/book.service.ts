import { Injectable } from '@angular/core';
import { UiService } from './ui.service';
import { HttpHelperService } from './http-helper.service';
import { Book } from './data-store.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private ui: UiService,
    private httpHelper: HttpHelperService
  ) { }

  getBooks(): Promise<Book[]> {
    return new Promise(async (resolve)=> {
      await this.ui.loading()
      this.httpHelper.request('get', `/books`).subscribe({
        next: resp => {
          this.ui.unLoading()
          resolve(resp)
        },
        error: err => this.ui.fireError(err)
      })
    })
  }

  createBook(book): Promise<Book> {
    return new Promise(async (resolve)=> {
      await this.ui.loading()
      this.httpHelper.request('post', `/books`, book).subscribe({
        next: resp => {
          this.ui.unLoading()
          this.ui.fireSuccess('Book successfully created')
          resolve(resp)
        },
        error: err => this.ui.fireError(err)
      })
    })
  }

  updateBook(id, book): Promise<Book> {
    return new Promise(async (resolve)=> {
      await this.ui.loading()
      this.httpHelper.request('put', `/books/${id}`, book).subscribe({
        next: resp => {
          this.ui.unLoading()
          this.ui.fireSuccess('Book successfully updated')
          resolve(resp)
        },
        error: err => this.ui.fireError(err)
      })
    })
  }

  deleteBook(id): Promise<void> {
    return new Promise(async (resolve)=> {
      await this.ui.loading()
      this.httpHelper.request('delete', `/books/${id}`).subscribe({
        next: resp => {
          this.ui.unLoading()
          this.ui.fireSuccess('Book successfully deleted')
          resolve(resp)
        },
        error: err => this.ui.fireError(err)
      })
    })
  }

}
