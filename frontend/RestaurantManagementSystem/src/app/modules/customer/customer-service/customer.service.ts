import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../../../auth-services/storage-services/storage.service';
import { Observable } from 'rxjs';


const BASIC_PATH = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(protected http : HttpClient) { }

  createAuthorizationHeader() : HttpHeaders{
    let authHeaders : HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      "Authorization", "Bearer "+ StorageService.getToken()
    );
  }

  getAllCategories() : Observable<any>{
    console.log(this.createAuthorizationHeader())
    return this.http.get(BASIC_PATH+"/api/customer/getcategories",{
      headers : this.createAuthorizationHeader()
    })
  }

  getAllCategoriesByTitle(categoryName : string) : Observable<any>{
    const url = `${BASIC_PATH}/api/customer/categories/${categoryName}`;

  return this.http.get(url, {
    headers: this.createAuthorizationHeader()
  });
  }

  getProductsByCategory(categoryId : number) : Observable<any>{
    const url = `${BASIC_PATH}/api/customer/${categoryId}/products`;

  return this.http.get(url, {
    headers: this.createAuthorizationHeader()
  });

  }

  getAllProductsByCategoryAndTitle(categoryId : number,categoryName : string) : Observable<any>{
    console.log(categoryName);
    const url = `${BASIC_PATH}/api/customer/${categoryId}/product/${categoryName}`;

  return this.http.get(url, {
    headers: this.createAuthorizationHeader()
  });
  }

  //Reservation

  postReservation(reservationDto : any) : Observable<any>{
    reservationDto.customerId = StorageService.getUserId();
    const url = `${BASIC_PATH}/api/customer/reservation`;
    return this.http.post(url, reservationDto ,{
      headers: this.createAuthorizationHeader()
    });
  }

  getReservationByUser(): Observable<any>{
    
    const url = `${BASIC_PATH}/api/customer/reservations/${StorageService.getUserId()}`;
    return this.http.get(url, {
      headers: this.createAuthorizationHeader()
    });
  }

}
