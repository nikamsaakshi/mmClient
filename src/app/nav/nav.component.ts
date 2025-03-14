import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-nav',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  faUser = faUser;
  faLogout = faSignOut;
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
    this.router.navigate(['home']);
  }

  getUserName(): string {
    let candidateEmail = '';
    if (localStorage?.getItem('candidateEmail')) {
      candidateEmail = localStorage?.getItem('candidateEmail')?.toString() || 'User';
    }
    candidateEmail = candidateEmail.substring(0, 5).toString();
    return candidateEmail;
  }
}
