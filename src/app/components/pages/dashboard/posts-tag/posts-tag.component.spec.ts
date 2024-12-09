import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsTagComponent } from './posts-tag.component';

describe('PostsTagComponent', () => {
  let component: PostsTagComponent;
  let fixture: ComponentFixture<PostsTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsTagComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
