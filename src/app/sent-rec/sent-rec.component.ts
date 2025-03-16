import { Component, OnInit } from '@angular/core';
import { CandidateProfileWithPhotos } from '../candidate.model';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sent-rec',
  imports: [FormsModule, CommonModule],
  templateUrl: './sent-rec.component.html',
  styleUrl: './sent-rec.component.css'
})

export class SentRecComponent implements OnInit {
  candidates: CandidateProfileWithPhotos[] = [];
  candidatesReceived: CandidateProfileWithPhotos[] = [];
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    let candidateId = '';
    if (localStorage?.getItem('candidateId')) {
      candidateId = localStorage?.getItem('candidateId')?.toString() || '0';
    }
    this.getSentInterestMatchingProfilesByCandidateId(candidateId);
    this.getReceivedInterestMatchingProfilesByCandidateId(candidateId);
  }

  getSentInterestMatchingProfilesByCandidateId(candidateId: string) {
    this.authService.getSentInterestMatchingProfilesByCandidateId(candidateId).subscribe({
      next: (response) => {
        this.candidates = response;
      },
      error: (error) => {
        alert('Error in getSentInterestMatchingProfilesByCandidateId' + error);
      }
    });
  }

  getReceivedInterestMatchingProfilesByCandidateId(candidateId: string) {
    this.authService.getReceivedInterestMatchingProfilesByCandidateId(candidateId).subscribe({
      next: (response) => {
        this.candidatesReceived = response;
      },
      error: (error) => {
        alert('Error in getReceivedInterestMatchingProfilesByCandidateId' + error);
      }
    });
  }

  acceptInterest(interestedCandidateId: number) {
    this.authService.updateCandidateInterest(interestedCandidateId, 1, 0).subscribe((response) => {
      const interestedCandidate = response;
      let indexToUpdate = this.candidatesReceived.findIndex(item =>
        item.candidateId === interestedCandidate.candidateId
        && item.interestedCandidateId == interestedCandidate.interestedCandidateId);
      this.candidatesReceived[indexToUpdate].isAccepted = interestedCandidate.isAccepted;
      this.candidatesReceived[indexToUpdate].isRejected = interestedCandidate.isRejected;
    });
    alert('Inetrest accepted successfully!');
  }

  rejectInterest(interestedCandidateId: number) {
    alert(interestedCandidateId)
    this.authService.updateCandidateInterest(interestedCandidateId, 0, 1).subscribe((respose)=>{
      alert(respose.isAccepted + "--"+respose.isRejected);
    });
  }
}