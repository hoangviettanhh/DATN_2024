import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        if (response.status === 200 && this.isLocalStorageAvailable()) {
          // Lưu access token và refresh token vào localStorage
          localStorage.setItem('accessToken', response.metadata.tokens.accessToken);
          localStorage.setItem('refreshToken', response.metadata.tokens.refreshToken);
          localStorage.setItem('userId', response.metadata.shop.user_id.toString());
          localStorage.setItem('userName', response.metadata.shop.name);
          localStorage.setItem('userEmail', response.metadata.shop.email);
        }
      }),
      catchError((error: any) => {
        const errorMessage = error.error?.message || 'Đã xảy ra lỗi';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  signup(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { name, email, password }).pipe(
      tap((response: any) => {
        if (response.status === 201 && this.isLocalStorageAvailable()) {
          // Lưu access token và refresh token vào localStorage
          localStorage.setItem('accessToken', response.metadata.tokens.accessToken);
          localStorage.setItem('refreshToken', response.metadata.tokens.refreshToken);
          localStorage.setItem('userId', response.metadata.user.user_id);
          localStorage.setItem('userName', response.metadata.user.name);
          localStorage.setItem('userEmail', response.metadata.user.email);
        }
      }),
      catchError((error: any) => {
        const errorMessage = error.error?.message || 'Đã xảy ra lỗi';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  logout(): Observable<any> {
    if (!this.isLocalStorageAvailable()) {
      throw new Error('localStorage không được hỗ trợ trong môi trường này.');
    }

    const clientId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('accessToken');

    if (!clientId || !accessToken) {
      throw new Error('Không thể đăng xuất, không tìm thấy thông tin người dùng.');
    }

    const headers = {
      'x-client-id': clientId,
      'authorization': accessToken,
    };

    return this.http.post(`${this.apiUrl}/logout`, {}, { headers }).pipe(
      tap(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
      }),
      catchError((error: any) => {
        const errorMessage = error.error?.message || 'Đã xảy ra lỗi khi đăng xuất';
        return throwError(() => new Error(errorMessage));
      })
    );
  }


  isAuthenticated(): boolean {
    return this.isLocalStorageAvailable() && localStorage.getItem('accessToken') !== null;
  }
}
