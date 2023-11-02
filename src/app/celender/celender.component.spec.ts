import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CelenderComponent } from './celender.component';

describe('CelenderComponent', () => {
  let component: CelenderComponent;
  let fixture: ComponentFixture<CelenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CelenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CelenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
