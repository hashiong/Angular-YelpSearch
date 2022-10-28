import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
    inputDistance: 10,
    selectCategory: 'all',
    inputLocation: '',
    autoDetect: false
  })


  categoryOptions: any = [
    { name: "Default", value: "all" },
    { name: "Arts & Entertainment", value: "arts" },
    { name: "Health & Medical", value: "health" },
    { name: "Hotel & Travel", value: "hotelstravel" },
    { name: "Food", value: "food" },
    { name: "Professional Services", value: "professional" }]

  selectedResult: any = "";
  filteredResults: any;
  isLoading = false;
  errorMsg!: string;
  results:any = [];
  submitted = false;

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


  getResults(){
    return this.yelpService.getYelpResults(this.searchForm.controls.inputKeyword.value!, this.searchForm.controls.selectCategory.value!,
      this.searchForm.controls.inputDistance.value!, this.searchForm.controls.autoDetect.value!)
  }

  onSubmit(): void {
    this.yelpService.getYelpResults(this.searchForm.controls.inputKeyword.value!, this.searchForm.controls.selectCategory.value!,
      this.searchForm.controls.inputDistance.value!, this.searchForm.controls.autoDetect.value!)
      .subscribe(
        (response) => {
          this.results = response["businesses"]
          console.log("results:" + this.results)
        this.submitted = true
  })
      
    
  }

  onSelected() {
    this.selectedResult = this.selectedResult;
    console.log(this.selectedResult);
  }

  checkOnChange(checked: boolean) {
    if (checked == true) {
      this.searchForm.controls.inputLocation.setValue('');
      this.searchForm.get("inputLocation")?.disable();
      this.searchForm.controls.autoDetect.setValue(true);
    }
    else {
      this.searchForm.get("inputLocation")?.enable();
      this.searchForm.controls.autoDetect.setValue(false);
    }

  }

  clear(){
    this.searchForm.reset()
    this.searchForm.controls.inputDistance.setValue(10)
    this.searchForm.controls.selectCategory.setValue("all")
    this.submitted = false
  }

  clearSelection() {
    this.selectedResult = "";
    
    this.filteredResults = [];
  }

  displayWith(value: any) {
    return value;
  }
}

