import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsrmComponent } from './osrm.component';

describe('OsrmComponent', () => {
  let component: OsrmComponent;
  let fixture: ComponentFixture<OsrmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsrmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OsrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
