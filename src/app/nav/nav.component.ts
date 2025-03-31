import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CandidateDetailsDialogComponent } from "../candidate-details-dialog/candidate-details-dialog.component";
@Component({
  selector: 'app-nav',
  imports: [CommonModule, FontAwesomeModule, CandidateDetailsDialogComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  faUser = faUser;
  faLogout = faSignOut;
  selectedCandidateId: number | null = null;
  constructor(private router: Router, private authService: AuthService) { }

  navigateTo(page: string) {
    this.router.navigate([page]);
  }

  get loginTitle() {
    if (this.authService.isLoggedIn()) {
      return 'Logout';
    }
    return 'Login';
  }

  isLogin() {
    return this.authService.isLoggedIn();
  }

  logOut(): void {
    let doLogout = confirm("Are you sure, you want to logout?");
    if (!doLogout) {
      return;
    }
    localStorage.removeItem('token');
    localStorage.removeItem('candidateId');
    localStorage.removeItem('candidateEmail');
    localStorage.removeItem('isPremium');
    localStorage.removeItem('gender');
    this.router.navigate(['home']);
  }

  getUserName(): string {
    let candidateEmail = '';
    if (localStorage?.getItem('candidateEmail')) {
      candidateEmail = localStorage?.getItem('candidateEmail')?.toString() || 'User';
    }
    candidateEmail = candidateEmail.substring(0, 3).toString();
    return candidateEmail;
  }

  openPopup(): void {
    if (localStorage?.getItem('candidateId')) {
      this.selectedCandidateId  = Number(localStorage?.getItem('candidateId')?.toString()) || 0;
    }
  }

  closePopup(): void {
    this.selectedCandidateId = null;
  }
}
