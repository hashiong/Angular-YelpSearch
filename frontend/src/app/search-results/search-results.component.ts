import { Component, OnInit, Input } from '@angular/core';
import { forkJoin, mergeMap } from 'rxjs';
import { YelpService } from '../yelp.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit {
  @Input() showResults: boolean = false;
  @Input() showDetails: boolean = false;
  @Input() businesses: any = [];

  selected_id: string = '';
  details: any = [];
  reviews: any = [];

  constructor(private yelpService: YelpService) {}

  onSelected(id: string) {
    this.selected_id = id;

    forkJoin([
      this.yelpService.getYelpDetails(id),
      this.yelpService.getYelpReviews(id),
    ]).subscribe((response) => {
      this.details = response[0];
      this.reviews = response[1];
      this.showDetails = true;
    });
  }

  getDetailStatus(status: boolean) {
    this.showDetails = status;
  }

  ngOnInit() {}
}
