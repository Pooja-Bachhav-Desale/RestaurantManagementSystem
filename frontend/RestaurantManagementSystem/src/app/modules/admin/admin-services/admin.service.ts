import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth-services/storage-services/storage.service';

const BASIC_PATH = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  

  constructor(protected http : HttpClient) { }

  postCategory(categoryDto : any):Observable<any>{
    return this.http.post(BASIC_PATH+"/api/admin/category",categoryDto,{
      headers : this.createAuthorizationHeader()
    })
  }

  
  getAllCategories() : Observable<any>{
    console.log(this.createAuthorizationHeader())
    return this.http.get(BASIC_PATH+"/api/admin/getcategories",{
      headers : this.createAuthorizationHeader()
    })
  }

  getAllCategoriesByTitle(categoryName : string) : Observable<any>{
    console.log(this.createAuthorizationHeader())
    console.log(categoryName);
    const url = `${BASIC_PATH}/api/admin/categories/${categoryName}`;

  return this.http.get(url, {
    headers: this.createAuthorizationHeader()
  });
  }

//Product Operations

  postProduct(categoryId : any,productDto : any):Observable<any>{
    const url = `${BASIC_PATH}/api/admin/${categoryId}/product`;
    return this.http.post(url, productDto, {
      headers : this.createAuthorizationHeader()
    })
  }

  getProductsByCategory(categoryId: any) : Observable<any> {
    const url = `${BASIC_PATH}/api/admin/${categoryId}/products`;
    return this.http.get(url,{
      headers : this.createAuthorizationHeader()
    })
  }

  getAllProductsByCategoryAndTitle(categoryId : number,categoryName : string) : Observable<any>{
    console.log(categoryName);
    const url = `${BASIC_PATH}/api/admin/${categoryId}/product/${categoryName}`;

  return this.http.get(url, {
    headers: this.createAuthorizationHeader()
  });
  }

  deleteProduct(productId : number){
    const url = `${BASIC_PATH}/api/admin/product/${productId}`;
  return this.http.delete(url, {
    headers: this.createAuthorizationHeader()
  });
  }

  getProductsById(productId: any) : Observable<any> {
    const url = `${BASIC_PATH}/api/admin/product/${productId}`;
    return this.http.get(url,{
      headers : this.createAuthorizationHeader()
    })
  }

  updateProduct(productId : number,productDto : any) : Observable<any>{
    const url = `${BASIC_PATH}/api/admin/product/${productId}`;
    return this.http.put(url , productDto ,
       {
      headers : this.createAuthorizationHeader()
    })
  }

  //Reservation

  getReservations(): Observable<any>{
    
    //const url = `${BASIC_PATH}/api/admin/reservations}`;
    return this.http.get(BASIC_PATH+"/api/admin/reservations",{
      headers : this.createAuthorizationHeader()
    })
  }


  changeReservationStatus(reservationId : any,status:string): Observable<any>{
    const url = `${BASIC_PATH}/api/admin/reservation/${reservationId}/${status}`;
    return this.http.get(url ,        {
      headers : this.createAuthorizationHeader()
    })
  }


  createAuthorizationHeader() : HttpHeaders{
    let authHeaders : HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      "Authorization", "Bearer "+ StorageService.getToken()
    );
  }
}
