import { TestBed } from '@angular/core/testing';

import { itemArrowClickService } from './arrow-button.service';

describe('ArrowButtonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: itemArrowClickService = TestBed.get(itemArrowClickService);
    expect(service).toBeTruthy();
  });
});
