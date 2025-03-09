import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { AuthService } from '../auth.service';
import { Modal } from 'bootstrap';
import { Candidate } from '../candidate.model';
import { AlertModalComponent } from "../alert-modal/alert-modal.component";

@Component({
  selector: 'app-home',
  imports: [FormsModule, RouterModule, CommonModule, AlertModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  @ViewChild('alertModal') alertModal!: AlertModalComponent;
  private loginModal!: Modal;
  private registerModal!: Modal;
  candidates: Candidate[] = [];

  //login
  email: string = '';
  password: string = '';

  //register
  emailId: string = '';
  registerPassword: string = '';
  aadhaarNumber: string = '';
  mobileNumber: string = '';

  //profile
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  DOB: Date = new Date();
  gender: string = '';
  addressLine1: string = '';
  addressLine2: string = '';
  taluka: string = '';
  pincode: string = '';
  villageOrcity: string = '';
  religion: string = '';
  cast: string = '';
  subCast: string = '';
  height: number = 0;
  weight: number = 0;
  complexion: string = '';
  district: string = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  ngAfterViewInit() {
    const modalElement = document.getElementById('loginModal');
    if (modalElement) {
      this.loginModal = new Modal(modalElement);
    }

    const registerModalElement = document.getElementById('registerModal');
    if (registerModalElement) {
      this.registerModal = new Modal(registerModalElement);
    }
  }

  openLoginModal() {
    if (this.loginModal) {
      this.loginModal.show();
    }
  }

  closeLoginModal() {
    if (this.loginModal) {
      this.loginModal.hide();
    } else {
      alert('closing error!')
    }
  }

  onRegister(form: NgForm) {
    if (form.valid) {
      this.authService.saveCandidateProfile(
        this.emailId,
        this.password,
        this.aadhaarNumber,
        this.mobileNumber
      ).subscribe(
        (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('candidateId', response.candidateId);
          localStorage.setItem('candidateEmail', response.email);
          this.showSuccess('Registration successful!!');
          this.closeRegisterModal();
          this.router.navigate(['create-profile']);
        },
        (error) => {
          alert('Login failed ' + error);
        });
    } else {
      alert('Form data invalid!');
    }
  }

  closeRegisterModal() {
    if (this.registerModal) {
      this.registerModal.hide();
    } else {
      alert('Error in closeRegisterModal')
    }
  }
  onCancel1() {
    this.closeRegisterModal();
    this.router.navigate(['home']);
  }

  onLogin(form: NgForm) {
    if (this.loginTitle === 'Logout') {
      this.logout();
    }
    if (form.valid) {
      // this.closeLoginModal();
      // this.router.navigate(['matching-profiles']);
      this.authService.login(this.email, this.password).subscribe(
        (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('candidateId', response.candidateId);
          localStorage.setItem('candidateEmail', response.email);
          localStorage.setItem('isPremium', response.isPremium);
          this.closeLoginModal();
          this.router.navigate(['matching-profiles']);
        },
        (error) => {
          this.showError('Login failed!');
          this.closeLoginModal();

        }
      );
    } else {
      this.showError('Invalid form data!');
    }
  }

  get loginTitle() {
    if (this.authService.isLoggedIn()) {
      return 'Logout';
    }
    return 'Login';
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('candidateId');
    localStorage.removeItem('candidateEmail');
    this.showInfo("Logged out successfully!");
    this.router.navigate(['home']);
  }


  onCancel() {
    this.closeLoginModal();
    this.router.navigate(['home']);
  }



  showSuccess(message: string) {
    this.alertModal.open(message, 'Success', 'success');
  }

  showInfo(message: string) {
    this.alertModal.open(message, 'Info', 'info');
  }

  showError(message: string) {
    this.alertModal.open(message, 'Error', 'error');
  }









}
