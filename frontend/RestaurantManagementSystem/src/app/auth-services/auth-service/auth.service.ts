import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_PATH = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient : HttpClient) { }

  signup(user : any) : Observable<any>{
    return this.httpClient.post(BASIC_PATH+"/api/auth/signup",user);
  }
  
  login(user : any) : Observable<any>{
    return this.httpClient.post(BASIC_PATH+"/api/auth/login",user);
  }

}
