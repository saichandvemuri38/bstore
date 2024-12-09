import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationParentComponent } from './pagination-parent.component';

describe('PaginationParentComponent', () => {
  let component: PaginationParentComponent;
  let fixture: ComponentFixture<PaginationParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationParentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
