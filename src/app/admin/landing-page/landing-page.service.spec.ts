import { HttpClientModule } from '@angular/common/http';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LandingPageService } from './landing-page.service';

describe('Service: LandingPage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [LandingPageService],
    });
  });

  it('should ...', inject(
    [LandingPageService],
    (service: LandingPageService) => {
      expect(service).toBeTruthy();
    }
  ));
});
