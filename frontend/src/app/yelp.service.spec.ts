import { TestBed } from '@angular/core/testing';

import { YelpService } from './yelp.service';

describe('YelpServicesService', () => {
  let service: YelpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YelpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
