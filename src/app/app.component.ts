import { Component, AfterViewInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Modal } from 'bootstrap';
import { AuthService } from './auth.service';
import { Router, RouterModule } from '@angular/router';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { Candidate } from './candidate.model';
import { CommonModule } from '@angular/common';
import { ProfilePhotoComponent } from './profile-photo/profile-photo.component';
import { NavComponent } from "./nav/nav.component";



@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterModule, CommonModule, NavComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mmClient';

  // private loginModal!: Modal;
  // private registerModal!: Modal;
  // candidates: Candidate[] = [];
  // private profilePhotoComponent: ProfilePhotoComponent;

  // //login
  // email: string = '';
  // password: string = '';

  // //register
  // emailId: string = '';
  // registerPassword: string = '';
  // aadhaarNumber: string = '';
  // mobileNumber: string = '';

  // //profile
  // firstName: string = '';
  // middleName: string = '';
  // lastName: string = '';
  // DOB: Date = new Date();
  // gender: string = '';
  // addressLine1: string = '';
  // addressLine2: string = '';
  // taluka: string = '';
  // pincode: string = '';
  // villageOrcity: string = '';
  // religion: string = '';
  // cast: string = '';
  // subCast: string = '';
  // height: number = 0;
  // weight: number = 0;
  // complexion: string = '';
  // district: string = '';

  // //loggedin
  // isLoggedIn = false;

  // constructor(private authService: AuthService, private router: Router) {
  //   this.profilePhotoComponent = new ProfilePhotoComponent(this.authService, this.router);
  // }

  // ngAfterViewInit() {
  //   const modalElement = document.getElementById('loginModal');
  //   if (modalElement) {
  //     this.loginModal = new Modal(modalElement);
  //   }

  //   const registerModalElement = document.getElementById('registerModal');
  //   if (registerModalElement) {
  //     this.registerModal = new Modal(registerModalElement);
  //   }
  // }

  // openLoginModal() {
  //   if (this.loginModal) {
  //     this.loginModal.show();
  //   }
  // }

  // closeLoginModal() {
  //   if (this.loginModal) {
  //     this.loginModal.hide();
  //   } else {
  //     alert('closing error!')
  //   }
  // }

  // onLogin(form: NgForm) {
  //   if (form.valid) {
  //     this.closeLoginModal();
  //     this.router.navigate(['matching-profiles']);
  //     // this.authService.login(this.email, this.password).subscribe(
  //     //   (response) => {
  //     //     this.closeLoginModal();
  //     //     this.router.navigate(['matching-profiles']);
  //     //   },
  //     //   (error) => {
  //     //     alert('Login failed ' + error);
  //     //   }
  //     // );
  //   } else {
  //     alert('Invalid form data')
  //   }
  // }

  // onRegister(form: NgForm) {
  //   if (form.valid) {
  //     this.authService.saveCandidateProfile(
  //       this.emailId,
  //       this.password,
  //       this.aadhaarNumber,
  //       this.mobileNumber
  //     ).subscribe(
  //       (response) => {
  //         alert('Registration successful!!');
  //         this.isLoggedIn = true;
  //         this.closeRegisterModal();
  //         this.router.navigate(['home']);
  //       },
  //       (error) => {
  //         alert('Login failed ' + error);
  //       });
  //   } else {
  //     alert('Form data invalid!');
  //   }
  // }

  // closeRegisterModal() {
  //   if (this.registerModal) {
  //     this.registerModal.hide();
  //   } else {
  //     alert('Error in closeRegisterModal')
  //   }
  // }
}