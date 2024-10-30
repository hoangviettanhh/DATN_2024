import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeService } from './home.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: any[] = [];  // Danh sách sản phẩm
  loading: boolean = true;
  errorMessage: string = '';
  priceForm: FormGroup;

  constructor(private homeService: HomeService, private fb: FormBuilder) {
    this.priceForm = this.fb.group({
      minPrice: [null],
      maxPrice: [null],
    });

  }

  ngOnInit() {
    this.loadProducts();
  }

  applyPriceFilter() {
    this.loading = true;
    const { minPrice, maxPrice } = this.priceForm.value;

    this.homeService.getProducts(minPrice, maxPrice).subscribe(
      (response) => {
        this.products = response.product;
        this.loading = false;
      },
      (error) => {
        console.error('Lỗi khi tải sản phẩm:', error);
        this.errorMessage = 'Không thể tải sản phẩm. Vui lòng thử lại sau.';
        this.loading = false;
      }
    );
  }

  loadProducts() {
    this.applyPriceFilter();
  }
}
