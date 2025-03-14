import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentRecComponent } from './sent-rec.component';

describe('SentRecComponent', () => {
  let component: SentRecComponent;
  let fixture: ComponentFixture<SentRecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SentRecComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
