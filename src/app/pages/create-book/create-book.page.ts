import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { DataStoreService, Book } from '../../services/data-store.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.page.html',
  styleUrls: ['./create-book.page.scss'],
  providers: [FormBuilder]
})
export class CreateBookPage implements OnInit {
  bookForm: FormGroup
  submitAttempt = false
  @Input() book: Book
  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private dataStore: DataStoreService,
    private ui: UiService
  ) {}

  ngOnInit() {
    this.bookForm = this.formBuilder.group({
      id: [this.book?.id],
      name: [this.book?.name, Validators.required],
      pages: [this.book?.pages, Validators.required],
      author: [this.book?.author, Validators.required]
    })
  }

  async create() {
    this.submitAttempt = true
    if (this.bookForm.valid) {
      if (this.book?.id) {
        const book = await this.bookService.updateBook(this.book.id, this.bookForm.value)
        this.dataStore.updateItem(book, 'books')
        this.ui.dismissModal()
      }else {
        const book = await this.bookService.createBook(this.bookForm.value)
        this.dataStore.addItem(book, 'books')
        this.ui.dismissModal()
      }
    }
  }

}
