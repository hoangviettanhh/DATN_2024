import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://reqres.in/api'; // Đặt URL API

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email: username, password }).pipe(
      tap((response: any) => {
        // Kiểm tra xem token có được trả về không
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token'); // Xóa token khi đăng xuất
  }

  isAuthenticated(): boolean {
    // Kiểm tra xem người dùng có đăng nhập hay không
    return localStorage.getItem('token') !== null;
  }
}
