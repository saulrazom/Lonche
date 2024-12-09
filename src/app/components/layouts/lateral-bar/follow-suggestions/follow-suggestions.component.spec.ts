import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowSuggestionsComponent } from './follow-suggestions.component';

describe('FollowSuggestionsComponent', () => {
  let component: FollowSuggestionsComponent;
  let fixture: ComponentFixture<FollowSuggestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowSuggestionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FollowSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
