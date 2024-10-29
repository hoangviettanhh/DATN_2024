import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/api'
  
  constructor(private http: HttpClient) { }

  // Gọi API để thêm sản phẩm mới
  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/products/add`, product); // Gọi API để thêm sản phẩm
  }

  getProducts(): Observable<any> {
    // return this.http.get(`${this.apiUrl}/products-hehe`);
    return this.http.get('https://fakestoreapi.com/products'); // Gọi API để lấy danh sách sản phẩm

  }
}
