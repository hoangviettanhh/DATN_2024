import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://reqres.in/api'; // Đặt URL API

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    // return this.http.post(`${this.apiUrl}/login`, { username, password });
    return this.http.post(`${this.apiUrl}/login`, { email: username, password });

  }

  logout() {
    localStorage.removeItem('token'); // Xóa token khi đăng xuất
  }
}
