import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Candidate } from './candidate.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:5098/api/Candidate';
  private http: any;
  uploadResponse: any;
  constructor(httpClient: HttpClient) {
    this.http = httpClient;
  }

  login(email: string, password: string): Observable<any> {
    try {
      const body = { email, password };
      return this.http.post(`${this.baseUrl}/login`, body);
    } catch (error) {
      console.log('error');
      console.log(error);
      return of(error);
    }
  }

  getMatchingProfilesByGender(gender: string): Observable<any> {
    try {
      return this.http.get(`${this.baseUrl}/getMatchingProfilesByGender/` + gender);
    } catch (error) {
      return of(error);
    }
  }

  getCandidateProfileByCandidateId(candidateId: number): Observable<any> {
    try {
      return this.http.get(`${this.baseUrl}/getCandidateProfileByCandidateId/` + candidateId);
    } catch (error) {
      return of(error);
    }
  }

  saveCandidateProfile(
    emailId: string,
    password: string,
    aadhaarNumber: string,
    mobileNumber: string
  ): Observable<any> {
    try {
      const body = {
        emailId,
        password,
        aadhaarNumber,
        mobileNumber
      };
      return this.http.post(`${this.baseUrl}/saveCandidate`, body);
    } catch (error) {
      return of(error);
    }
  }

  saveProfile(
    imagemDocData: FormData
  ): Observable<any> {
    try {
      const body = {
        imagemDocData
      };
      return this.http.post(`${this.baseUrl}/saveCandidateProfile   `, imagemDocData);
    } catch (error) {
      return of(error);
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  uploadImage(imageToBeuploade: FormData): Observable<any> {
    const body = {
      imageToBeuploaded: imageToBeuploade
    };
    return this.http.post('http://localhost:5098/api/Candidate/uploadImage/' + 'Sample', body);
  }

  getImages(): Observable<any> {
    return this.http.get(`http://localhost:5098/api/Candidate/getImages`);
  }

  processPayment(): Observable<boolean> {
    let candidateId = '';
    if (localStorage?.getItem('candidateId')) {
      candidateId = localStorage?.getItem('candidateId')?.toString() || '0';
    }
    alert(candidateId);
    let response = this.http.post(`${this.baseUrl}/updatePremium/` + candidateId);
    if (response) {
      return of(true);
    }
    return of(false);
  }
}

export interface PaymentRequest1 {
  paymentMethod: 'CreditCard' | 'UPI';
  // Credit Card Fields
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardHolderName?: string;
  // UPI Field
  upiId?: string;
  amount: number;
}

