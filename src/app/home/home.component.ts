import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { AuthService } from '../auth.service';
import { Modal } from 'bootstrap';
import { Candidate } from '../candidate.model';
// import { ProfilePhotoComponent } from '../profile-photo/profile-photo.component';

@Component({
  selector: 'app-home',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  private loginModal!: Modal;
  private registerModal!: Modal;
  candidates: Candidate[] = [];
  // private profilePhotoComponent: ProfilePhotoComponent;

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

  //loggedin
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {
    // this.profilePhotoComponent = new ProfilePhotoComponent(this.authService, this.router);
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
          alert('Registration successful!!');
          this.isLoggedIn = true;
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

  onLogin(form: NgForm) {
    if (form.valid) {
      this.closeLoginModal();
      this.router.navigate(['matching-profiles']);
      // this.authService.login(this.email, this.password).subscribe(
      //   (response) => {
      //     this.closeLoginModal();
      //     this.router.navigate(['matching-profiles']);
      //   },
      //   (error) => {
      //     alert('Login failed ' + error);
      //   }
      // );
    } else {
      alert('Invalid form data')
    }
  }
}
