import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api'; // Đặt URL API

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        if (response.status === 200) {
          // Lưu access token và refresh token vào localStorage
          localStorage.setItem('accessToken', response.metadata.tokens.accessToken);
          localStorage.setItem('refreshToken', response.metadata.tokens.refreshToken);
          localStorage.setItem('userId', response.metadata.user.user_id); 
          localStorage.setItem('userName', response.metadata.user.name); 
          localStorage.setItem('userEmail', response.metadata.user.email); 
        }
      }),
      catchError((error: any) => {
        // Xử lý lỗi từ API
        if (error.error) {
          return throwError(() => new Error(error.error.message || 'Unknown error'));
        } else {
          return throwError(() => new Error('An error occurred'));
        }
      })
    );
  }

  signup(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password }).pipe(
      tap((response: any) => {
        if (response.status === 201) {
          // Lưu access token và refresh token vào localStorage
          localStorage.setItem('accessToken', response.metadata.tokens.accessToken);
          localStorage.setItem('refreshToken', response.metadata.tokens.refreshToken);
          localStorage.setItem('userId', response.metadata.user.user_id);
          localStorage.setItem('userName', response.metadata.user.name);
          localStorage.setItem('userEmail', response.metadata.user.email);
        }
      }),
      catchError((error: any) => {
        // Xử lý lỗi từ API
        if (error.error) {
          return throwError(() => new Error(error.error.message || 'Unknown error'));
        } else {
          return throwError(() => new Error('An error occurred'));
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId'); 
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');   
  }

  isAuthenticated(): boolean {
    // Kiểm tra xem người dùng có đăng nhập hay không bằng  access token
    return localStorage.getItem('accessToken') !== null;
  }
}
