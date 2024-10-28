import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service'; // Đảm bảo đường dẫn chính xác
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Thêm import

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup; // Khai báo FormGroup cho form đăng nhập
  errorMessage: string = ''; // Khởi tạo biến để hiển thị thông báo lỗi

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    // Khởi tạo form với các control
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]], // Email là bắt buộc
      password: ['', [Validators.required]], // Password là bắt buộc
    });
  }

  handleSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value; // Lấy giá trị từ form
      this.onLogin(username, password); // Gọi hàm đăng nhập
    }
  }

  onLogin(username: string, password: string) {
    this.authService.login(username, password).subscribe(
      (response) => {
        console.log('Response:', response); // Log response
        if (response.token) {
          localStorage.setItem('token', response.token); // Lưu token vào localStorage
          this.router.navigate(['/cart']); // Điều hướng sau khi đăng nhập thành công
        } else {
          this.errorMessage = 'Không nhận được token từ server.';
        }
      },
      (error) => {
        console.error('Error:', error); // Log error
        this.errorMessage = 'Tên đăng nhập hoặc mật khẩu không đúng.'; // Thông báo lỗi
      }
    );
  }
}
