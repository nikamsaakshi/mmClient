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
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    let candidateId = '';
    if (localStorage?.getItem('candidateId')) {
      candidateId = localStorage?.getItem('candidateId')?.toString() || '0';
    }
    this.getSentInterestMatchingProfilesByCandidateId(candidateId)
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
}