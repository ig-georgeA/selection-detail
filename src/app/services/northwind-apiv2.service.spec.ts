import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NorthwindAPIv2Service } from './northwind-apiv2.service';

describe('NorthwindAPIv2Service', () => {
  let service: NorthwindAPIv2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(NorthwindAPIv2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
