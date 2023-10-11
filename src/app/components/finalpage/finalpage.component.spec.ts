import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalpageComponent } from './finalpage.component';

describe('FinalpageComponent', () => {
  let component: FinalpageComponent;
  let fixture: ComponentFixture<FinalpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinalpageComponent]
    });
    fixture = TestBed.createComponent(FinalpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
