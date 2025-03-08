import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
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
    localStorage.removeItem('token');
    localStorage.removeItem('candidateId');
    localStorage.removeItem('candidateEmail');
    this.router.navigate(['home']);
  }
}
