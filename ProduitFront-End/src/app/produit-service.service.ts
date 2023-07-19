import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../app/product';

@Injectable({
  providedIn: 'root'
})
export class ProduitServiceService {


  private apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) { }

getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
      }
    
createProduct(product: any): Observable<string> {
        return this.http.post(this.apiUrl, product,{ responseType: 'text' });
          }
        

deleteProduct(id: number): Observable<string> {
            return this.http.delete(`${this.apiUrl}/${id}`,{ responseType: 'text' });
              }

putproduct(data:any,id : number): Observable<string>{
  return this.http.put(`${this.apiUrl}/${id}`,data,{ responseType: 'text' })
}

          }
      
      







