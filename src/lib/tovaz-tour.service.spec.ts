import { TestBed } from '@angular/core/testing';

import { TovazTourService } from './tovaz-tour.service';

describe('GuideTourService', () => {
  let service: TovazTourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TovazTourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
