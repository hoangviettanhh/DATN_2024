import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  products: any[] = []; // Biến để lưu danh sách sản phẩm
  loading: boolean = true; 
  errorMessage: string = '';

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.loadProducts(); //loadProducts khi component khởi tạo
  }

  loadProducts() {
    this.homeService.getProducts().subscribe(
      (response) => {
        this.products = response; 
        this.loading = false;
      },
      (error) => {
        console.error('Lỗi khi tải sản phẩm:', error);
        this.errorMessage = 'Không thể tải sản phẩm. Vui lòng thử lại sau.'; // Ghi lại thông báo lỗi
        this.loading = false; 
      }
    );
  }
}
