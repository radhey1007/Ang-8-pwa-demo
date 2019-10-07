import { BooksService } from './../books/books.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { async } from 'q';
import { MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  displayedColumns: string[] = ['title', 'author', 'publication', 'details'];
  books = new MatTableDataSource<any>();
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private bookService: BooksService) { }

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(params => {
      this.searchBooks(params['query']);
    })
  }

  searchBooks = async (query: string) => {
    const results = await this.bookService.searchBooks(query);
    console.log(results, 'in search book');
    this.books.data = results.docs;
  }
  ngOnDestroy = () => {
    this.subscription.unsubscribe();
  }

  viewDetails = (book) => {
    
    console.log(book);

    this.router.navigate(['details'],{queryParams:{
      title: book.title,
      authors: book.author_name && book.author_name.join(', '),
      year: book.first_publish_year,
      cover_id: book.cover_edition_key
    }})
  }

}
