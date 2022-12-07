import { Component, TemplateRef, ViewChild } from '@angular/core';
import { SortType } from '@swimlane/ngx-datatable';
import { AuthService, User } from '../../services/auth.service';
import { UiService } from '../../services/ui.service';
import { CreateBookPage } from '../create-book/create-book.page';
import { DataStoreService } from '../../services/data-store.service';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  sortType = SortType.multi
  columns = []
  constructor(
    public auth: AuthService,
    private ui: UiService,
    private bookService: BookService,
    public dataStore: DataStoreService
  ) {
    this.getBooks()
    this.columns = [
      { prop: 'name', name: 'Name' },
      { prop: 'pages', name: 'Pages' },
      { prop: 'author', name: 'Author' },
      { prop: 'action', name: 'Actions' }
    ]
  }

  async getBooks() {
    this.dataStore.books = await this.bookService.getBooks()
  }

  showCreateBookModal(book?) {
    this.ui.modal({
      component: CreateBookPage,
      componentProps: { book },
      cssClass: 'custom-modal'
    })
  }

  editBook(book) {
    this.showCreateBookModal(book)
  }

  async deleteBook(book) {
    await this.ui.confirmation({
      header: 'Delete Book',
      message: `Are you sure to delete "${book.name}" book ?`
    })
    await this.bookService.deleteBook(book.id)
    this.dataStore.removeItem({ id: book.id, items: 'books' })
  }

}
