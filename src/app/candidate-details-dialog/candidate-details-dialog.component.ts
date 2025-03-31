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
  age: number = 0;
  sessionCandidateId: number = 0;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if (localStorage?.getItem('candidateId')) {
      this.sessionCandidateId = Number(localStorage?.getItem('candidateId')?.toString()) || 0;
    }
    this.authService.getCandidateProfileByCandidateId(this.candidateId).subscribe({
      next: (data) => this.candidate = data,
      error: (err) => alert(err)
      
    });
    let timeDiff = Math.abs(Date.now() - this.candidate.DOB.getTime());
    this.age = 38;
    alert(this.age);
  }

  onClose(): void {
    this.closeDialog.emit();
  }

  onSendInterest(candidateId: number) {
    this.authService.sendIneterest(candidateId).subscribe(() => { });
    alert('Interset Sent Successfully!!');
    this.closeDialog.emit();
  }
}
