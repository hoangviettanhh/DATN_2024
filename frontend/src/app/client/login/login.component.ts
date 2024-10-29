import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Thêm import
import { CommonModule } from '@angular/common'; // Thêm CommonModule

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  signupForm: FormGroup; // Khai báo FormGroup cho form đăng ký
  errorMessage: string = '';
  signupErrorMessage: string = ''; // Thông báo lỗi đăng ký
  isSignupVisible: boolean = false; // hiển thị popup đăng ký

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    // Khởi tạo form đăng nhập
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    // Khởi tạo form đăng ký
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]], // Thêm trường name
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  handleSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.onLogin(username, password);
    }
  }

  onLogin(username: string, password: string) {
    this.authService.login(username, password).subscribe(
      (response) => {
        if (response.metadata.tokens && response.metadata.tokens.accessToken) {
          localStorage.setItem('token', response.metadata.tokens.accessToken);
          this.router.navigate(['/user']);
        } else {
          this.errorMessage = 'Không nhận được token từ server.';
        }
      },
      (error) => {
        this.errorMessage = 'Tên đăng nhập hoặc mật khẩu không đúng.';
      }
    );
  }


  showSignupPopup() {
    this.isSignupVisible = true; // Hiển thị popup
  }

  closeSignupPopup() {
    this.isSignupVisible = false; // Ẩn popup
    this.signupForm.reset(); // Reset form đăng ký
    this.signupErrorMessage = ''; // Xóa thông báo lỗi
  }

  handleSignup() {
    if (this.signupForm.valid) {
      const { name, email, password } = this.signupForm.value;
      this.authService.signup(name, email, password).subscribe(
        (response) => {
          if (response.metadata?.tokens?.accessToken) {
            // Lưu thông tin token và user vào localStorage
            localStorage.setItem('accessToken', response.metadata.tokens.accessToken);
            localStorage.setItem('refreshToken', response.metadata.tokens.refreshToken);
            localStorage.setItem('userId', response.metadata.user.user_id);
            localStorage.setItem('userName', response.metadata.user.name);
            localStorage.setItem('userEmail', response.metadata.user.email);

            this.router.navigate(['/login']);
            this.closeSignupPopup();
          } else {
            this.signupErrorMessage = 'Đăng ký thành công nhưng không nhận được token.';
          }
        },
        (error) => {
          console.error('Lỗi đăng ký:', error);
          this.signupErrorMessage = 'Đăng ký không thành công. Vui lòng thử lại.';
        }
      );
    }
  }
}
