import { TestBed } from '@angular/core/testing';

import { CharacterDetailsApi } from './character-details-api';

describe('CharacterDetailsApi', () => {
  let service: CharacterDetailsApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterDetailsApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
