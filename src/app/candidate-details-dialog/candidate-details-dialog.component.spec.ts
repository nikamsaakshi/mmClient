import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateDetailsDialogComponent } from './candidate-details-dialog.component';

describe('CandidateDetailsDialogComponent', () => {
  let component: CandidateDetailsDialogComponent;
  let fixture: ComponentFixture<CandidateDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidateDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
