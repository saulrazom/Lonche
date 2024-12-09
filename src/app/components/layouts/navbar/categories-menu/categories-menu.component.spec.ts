import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesMenuComponent } from './categories-menu.component';

describe('CategoriesMenuComponent', () => {
  let component: CategoriesMenuComponent;
  let fixture: ComponentFixture<CategoriesMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
