import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { YelpService } from '../yelp.service';


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  @Input() businesses:any;
 
  constructor(private yelpService: YelpService){

  }

  onSelected() {
  }




  ngOnInit() {
  }
}
