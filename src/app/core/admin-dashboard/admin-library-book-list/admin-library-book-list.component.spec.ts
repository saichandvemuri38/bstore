import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLibraryBookListComponent } from './admin-library-book-list.component';

describe('AdminLibraryBookListComponent', () => {
  let component: AdminLibraryBookListComponent;
  let fixture: ComponentFixture<AdminLibraryBookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLibraryBookListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLibraryBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
