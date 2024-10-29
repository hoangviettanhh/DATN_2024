import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent {
  userName: string | null;
  userEmail: string | null;

  constructor(private authService: AuthService, private router: Router) {
    this.userName = localStorage.getItem('userName');
    this.userEmail = localStorage.getItem('userEmail');
  }

  onLogout() {
    this.authService.logout().subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Lỗi khi đăng xuất:', error);
      }
    );
  }
}
