import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private mockUser = { email: 'test@example.com', password: 'pass' };
  private baseUrl = 'http://localhost:5098/api/Candidate'; //REST API URL
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
      // const body = { gender };
      return this.http.get(`${this.baseUrl}/getMatchingProfilesByGender/` + gender);
    } catch (error) {
      return of(error);
    }
  }

  saveCandidateProfile(
    emailId: string, password: string, aadhaarNumber: string, mobileNumber: string): Observable<any> {
    try {
      const body = {
        emailId,
        password,
        aadhaarNumber,
        mobileNumber
      };
      return this.http.post(`${this.baseUrl}/saveCandidate`, body);
    } catch (error) {
      alert(error);
      console.log('error');
      console.log(error);
      return of(error);
    }
  }


  saveProfile(
    candidateId: number,
    firstName: string,
    middleName: string,
    lastName: string,
    DOB: Date,
    gender: string,
    addressLine1: string,
    addressLine2: string,
    taluka: string,
    district: string,
    pincode: string,
    villageOrcity: string,
    religion: string,
    cast: string,
    subCast: string,
    height: number,
    weight: number,
    complexion: string
  ): Observable<any> {
    try {
      const body = {
        candidateId: 4,
        firstName,
        middleName,
        lastName,
        DOB,
        gender,
        addressLine1,
        addressLine2,
        taluka,
        district,
        pincode,
        villageOrcity,
        religion,
        cast,
        subCast,
        height,
        weight,
        complexion
      };
      return this.http.post(`${this.baseUrl}/saveCandidateProfile`, body);
    } catch (error) {
      alert(error);
      console.log('error');
      console.log(error);
      return of(error);
    }
  }

  uploadImage(imageToBeuploade: FormData): Observable<any> {
const body = {
  imageToBeuploaded: imageToBeuploade
};
alert('kkkk ')
   return this.http.post('http://localhost:5098/api/Candidate/uploadImage/'+'Sample', body);
    //  .subscribe({  next: (response: any) => {
    //     this.uploadResponse = response;
    //     console.log('Upload successful', response);
    //  }});
  }
}

