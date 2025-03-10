import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-candidate-details-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './candidate-details-dialog.component.html',
  styleUrl: './candidate-details-dialog.component.css'
})
export class CandidateDetailsDialogComponent implements OnInit {
  
  @Input() candidateId!: number;
  @Output() closeDialog = new EventEmitter<void>();
  candidate: any;

  constructor(private candidateService: AuthService) { }

  ngOnInit(): void {
   
    this.candidateService.getCandidateProfileByCandidateId(this.candidateId).subscribe({
      next: (data) => this.candidate = data,
      error: (err) => alert(err)
    });

    alert(this.candidate.candidateId);
  }

  onClose(): void {
    this.closeDialog.emit();
  }

  onSendInterest() {
    alert('Interset Sent Successfully!!');
    this.closeDialog.emit();
  }
}
