import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { YelpService } from '../yelp.service';
import { HttpClient } from '@angular/common/http';
import { debounceTime, tap, switchMap, finalize, distinctUntilChanged, filter } from 'rxjs/operators';



@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  searchForm = this.formBuilder.group({
    inputKeyword: '',
    inputDistance: '10',
    selectCategory: 'all',
    inputLocation: '',
    autoDetect: 'false'
  })
  
  
  categoryOptions: any = [
    {name: "Default", value: "all"},
    {name: "Arts & Entertainment", value: "arts"}, 
    {name: "Health & Medical", value: "health"}, 
    {name: "Hotel & Travel", value: "hotelstravel"},
    {name: "Food", value: "food"}, 
    {name: "Professional Services", value: "professional"}]
  
  selectedResult: any = "";
  filteredResults: any;
  isLoading = false;
  errorMsg!: string;
  results=[];

  constructor(private http: HttpClient, private yelpService: YelpService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.searchForm.controls.inputKeyword.valueChanges
    .pipe(
      filter(res => {
        return res !== null && res.length >= 1
      }),
      distinctUntilChanged(),
      debounceTime(500),
      tap(() => {
        this.errorMsg = "";
        this.filteredResults = [];
        this.isLoading = true;
      }),
      switchMap(value => this.http.get("http://localhost:8000/yelpautocomplete?text=" + value)
        .pipe(
          finalize(() => {
            this.isLoading = false
          }),
        )
      )
    )
    .subscribe((data: any) => {
      if (data["businesses"] == undefined) {
        this.errorMsg = data['Error'];
        this.filteredResults = [];
      } else {
        this.errorMsg = "";
        this.filteredResults = data['businesses'];
      }
    });
  }
  

  getResults(): void {
    this.yelpService.getYelpResults()
    .subscribe(results => this.results = results);
  }

  onSubmit(): void {
    console.log('Your order has been submitted', this.searchForm.value);
  }

  onSelected() {
    this.selectedResult = this.selectedResult;
    console.log(this.selectedResult);
  }

  checkOnChange(checked:boolean){
    if(checked == true){
      this.searchForm.controls.inputLocation.setValue('');
      this.searchForm.get("inputLocation")?.disable();
    }
    else{
      this.searchForm.get("inputLocation")?.enable();
    }

  }

  clearSelection() {
    this.selectedResult = "";
    this.filteredResults = [];
  }

  displayWith(value: any) {
    return value;
  }
}

