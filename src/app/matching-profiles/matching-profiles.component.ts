import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { Candidate, CandidateProfileWithPhotos } from '../candidate.model';
import { CandidateDetailsDialogComponent } from '../candidate-details-dialog/candidate-details-dialog.component';

@Component({
  selector: 'app-matching-profiles',
  imports: [RouterModule, FormsModule, CommonModule, CandidateDetailsDialogComponent],
  standalone: true,
  templateUrl: './matching-profiles.component.html',
  styleUrl: './matching-profiles.component.css'
})
export class MatchingProfilesComponent {
  candidates: CandidateProfileWithPhotos[] = [];
  mergedData: any;
  isPremium: boolean;
  constructor(private authService: AuthService, private router: Router) {
    this.isPremium = false;
  }

  ngOnInit() {
    let candidateId = '';
    if (localStorage?.getItem('candidateId')) {
      candidateId = localStorage?.getItem('candidateId')?.toString() || '0';
    }
    let candidate = new Candidate;
    this.authService.isProfileExists(candidateId).subscribe((response) => {
      candidate = response;
    });

    if (candidate == null) {
      alert("Please complete your profile to access this feature!")
      this.router.navigate(["home"]);
    }

    if (localStorage?.getItem('isPremium') == '1') {
      this.isPremium = true;
    }

    let gender = '';
    if (candidate != null) {
      gender = candidate.gender;
    }
    this.getMatchingProfilesByGender(gender);
  }

  getMatchingProfilesByGender(gender: string) {
    this.authService.getMatchingProfilesByGender(gender).subscribe({
      next: (response) => {
        this.candidates = response;
      },
      error: (error) => {
        alert('Error in getMatchingProfilesByGender' + error);
      }
    });
  }

  getRandomNumber(): string {
    return Math.random().toString().substring(0, 5);
  }

  selectedCandidateId: number | null = null;

  openPopup(item: any): void {
    if (!this.isPremium) {
      if (confirm('This feature requires Premium Service! Would you like to pay and activate Premium Service?')) {
        this.router.navigate(['app-payment-form']);
      } else {
        return;
      }
      return;
    }
    this.selectedCandidateId = item.candidateId;
  }

  closePopup(): void {
    this.selectedCandidateId = null;
  }
}
