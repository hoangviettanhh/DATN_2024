import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
//   styleUrls: ['./user.component.css']
})
export class UserComponent {
//   userName: string | null;
//   userEmail: string | null;

  constructor(private authService: AuthService, private router: Router) {
    // Lấy thông tin từ localStorage
    // this.userName = localStorage.getItem('userName');
    // this.userEmail = localStorage.getItem('userEmail');
  }

  onLogout() {
    // Gọi AuthService để xử lý đăng xuất
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
