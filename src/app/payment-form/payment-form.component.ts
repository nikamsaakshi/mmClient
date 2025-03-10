import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, PaymentRequest1 } from '../auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee, faCreditCard, faInr, faListNumeric } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-form',
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent {
  faCreditCard = faCreditCard;
  faInr = faInr;
  faListNumeric = faListNumeric;
  paymentMethod: 'CreditCard' | 'UPI' = 'CreditCard';
  paymentData: PaymentRequest1 = {
    paymentMethod: 'CreditCard',
    amount: 2100,
    cardNumber: '4012888888881881',
    cvv: '181',
    cardHolderName: 'First Name',
    expiryDate: '09/29',
    upiId: 'sakshinikam@okaxis'
  };
  paymentResponse: any;
  paymentError: string | null = null;

  constructor(private paymentService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.paymentData.paymentMethod = this.paymentMethod;
    this.paymentService.processPayment().subscribe({
      next: (response) => {
        alert(response)
        localStorage.setItem('isPremium', '1');
        this.paymentResponse = response;
        this.paymentError = null;
        this.router.navigate(['matching-profiles']);
      },
      error: (error) => {
        localStorage.removeItem('isPremium');
        alert('Payment failed. Please try again Or Contact Admin');
        this.paymentError = 'Payment failed. Please try again Or Contact Admin';
        this.paymentResponse = null;
      }
    });
  }
}
