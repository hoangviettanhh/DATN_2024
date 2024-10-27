import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service'; // Chỉnh đường dẫn cho đúng
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [], // Thêm các module cần thiết nếu cần
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  handleSubmit(event: Event) {
    event.preventDefault(); // Ngăn chặn hành vi submit mặc định
    const form = event.target as HTMLFormElement;
    console.log(form);
    debugger;
    this.username = form.email.value;
    this.password = form.password.value;

    // Gọi hàm đăng nhập
    this.onLogin();
  }

  onLogin() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        localStorage.setItem('token', response.token); // Lưu token vào localStorage
        this.router.navigate(['/cart']); // Điều hướng sau khi đăng nhập thành công
      },
      (error) => {
        this.errorMessage = 'Tên đăng nhập hoặc mật khẩu không đúng.'; // Thông báo lỗi
      }
    );
  }
}
