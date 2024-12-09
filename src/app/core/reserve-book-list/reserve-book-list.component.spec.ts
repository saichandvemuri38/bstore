import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveBookListComponent } from './reserve-book-list.component';

describe('ReserveBookListComponent', () => {
  let component: ReserveBookListComponent;
  let fixture: ComponentFixture<ReserveBookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserveBookListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReserveBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
