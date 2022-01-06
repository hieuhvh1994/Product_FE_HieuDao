import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/product';
import {environment} from '../../environments/environment.prod';

const API_LOCAL = environment.API_LOCAL;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(API_LOCAL);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(API_LOCAL, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(API_LOCAL + `/` + id, product);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(API_LOCAL + `/` + id);
  }

  findProductById(id: number): Observable<Product> {
    return this.http.get<Product>(API_LOCAL + `/` + id);
  }


}
