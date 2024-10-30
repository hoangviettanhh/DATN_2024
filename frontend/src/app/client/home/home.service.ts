import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/products/add`, product);
  }

  getProducts(minPrice: number | null, maxPrice: number | null): Observable<any> {
    let params = new HttpParams();

    if (minPrice !== null) {
      params = params.set('minPrice', minPrice.toString());
    }
    if (maxPrice !== null) {
      params = params.set('maxPrice', maxPrice.toString());
    }

    if (params.keys().length > 0) {
      return this.http.get(`${this.apiUrl}/products-hehe`, { params });
    } else {
      return this.http.get(`${this.apiUrl}/products-hehe`);
    }
  }

}
