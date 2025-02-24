import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private mockUser = { email: 'test@example.com', password: 'pass' };
  private baseUrl = 'http://localhost:5098/api/Candidate';
  private http: any;
  constructor(httpClient: HttpClient) {
    this.http = httpClient;
  }

  login(email: string, password: string): Observable<any> {
    try {
      alert('login api')
      const body = { email, password };
      return this.http.post(`${this.baseUrl}/login`, body);
    } catch (error) {
      console.log('error');
      console.log(error);
      return of(error);
    }
  }
}
