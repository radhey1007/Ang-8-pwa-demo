import { BooksService } from './books/books.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularBooksPWA';
  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router) {
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required],
    });
  }

  onSearch = () => {
    if(!this.searchForm.valid) return;

    this.router.navigate(['search'], {queryParams :{query:this.searchForm.get('search').value}})

  }

}
