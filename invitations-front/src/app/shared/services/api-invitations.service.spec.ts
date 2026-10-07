import { TestBed } from '@angular/core/testing';

import { ApiInvitationsService } from './api-invitations.service';

describe('ApiInvitationsService', () => {
  let service: ApiInvitationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiInvitationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
