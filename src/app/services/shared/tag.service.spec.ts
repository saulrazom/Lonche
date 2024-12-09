import { TestBed } from '@angular/core/testing';
import { TagService } from './tag.service';

describe('TagService', () => {
  let service: TagService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TagService],
    });
    service = TestBed.inject(TagService);
  });

  fit('should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('should have an initial tag value of an empty string', (done) => {
    service.tag$.subscribe((tag) => {
      expect(tag).toBe('');
      done();
    });
  });

  fit('should update the tag when updateTag is called', (done) => {
    const newTag = 'Test Tag';

    service.tag$.subscribe((tag) => {
      if (tag === newTag) {
        expect(tag).toBe(newTag);
        done();
      }
    });

    service.updateTag(newTag);
  });
});
