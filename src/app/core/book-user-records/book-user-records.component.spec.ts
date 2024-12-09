import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookUserRecordsComponent } from './book-user-records.component';

describe('BookUserRecordsComponent', () => {
  let component: BookUserRecordsComponent;
  let fixture: ComponentFixture<BookUserRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookUserRecordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookUserRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
