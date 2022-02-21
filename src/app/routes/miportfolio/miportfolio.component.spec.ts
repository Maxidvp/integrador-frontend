import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiportfolioComponent } from './miportfolio.component';

describe('MiportfolioComponent', () => {
  let component: MiportfolioComponent;
  let fixture: ComponentFixture<MiportfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiportfolioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiportfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
