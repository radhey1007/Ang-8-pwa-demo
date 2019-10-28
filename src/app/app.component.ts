import { BooksService } from './books/books.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SwUpdate } from '@angular/service-worker';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'AngularBooksPWA';
  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router, public swUpdate:SwUpdate) {
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required],
    });

    if(this.swUpdate.isEnabled){
      this.swUpdate.available.subscribe((next)=> {
        if(confirm('New Version available,Update new version')){
          window.location.reload();
        }
      })
    }

  }

  onSearch = () => {
    if(!this.searchForm.valid) return;

    this.router.navigate(['search'], {queryParams :{query:this.searchForm.get('search').value}})

  }

}
