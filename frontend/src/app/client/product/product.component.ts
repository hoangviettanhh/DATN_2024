import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from './product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any[] = []; // Biến để lưu danh sách sản phẩm
  loading: boolean = true; 
  errorMessage: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts(); //loadProducts khi component khởi tạo
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
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
