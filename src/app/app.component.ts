import { Component, AfterViewInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Modal } from 'bootstrap';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'mmClient';

  private loginModal!: Modal;
  email: string = '';
  password: string = '';
  isLoggedIn = false;

  constructor(private authService: AuthService) {}

  ngAfterViewInit() {
    const modalElement = document.getElementById('loginModal');
    if (modalElement) {
      this.loginModal = new Modal(modalElement);
    }
  }

  openLoginModal() {
    alert('openModal')
    if (this.loginModal) {
      this.loginModal.show();
    }
  }

  closeLoginModal() {
    alert('closeModal')
    if (this.loginModal) {
      alert('closing success')
      this.loginModal.hide();
    } else{
      alert('closing error')
    }
  }

  onLogin(form: NgForm) {
    alert('onLogin')
    if (form.valid) {
      alert('valid')
      this.authService.login(this.email, this.password).subscribe(
        (response) => {
          alert('Login successful '+ response);
          this.isLoggedIn = true;
          this.closeLoginModal();
        },
        (error) => {
          alert('Login failed '+ error);
        }
      );
    } else {
      alert('Invalid')
    }
  }
}
