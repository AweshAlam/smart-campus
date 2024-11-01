import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import { catchError, Observable, throwError } from 'rxjs';
import { jwtDecode  } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = "http://localhost:8080/auth/login"
  constructor(private http:HttpClient) { }

  doLogin(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(this.url, credentials);
  }

  loginUser(token:any)
  {
    localStorage.setItem("token",token)
    return true;
  }

  isLoginUser(){
    let token = localStorage.getItem("token");
    if(token==undefined || token =='' || token == null){
      return false;

    } else {
      return true;
    }
  }

  logout(){
    localStorage.removeItem('token')
    return true ;
  }

  getRoleFromToken(): string | null {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("No token found in localStorage.");
      return null;
    }
  
    
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      console.error("Invalid token structure: expected 3 parts, found", tokenParts.length);
      return null;
    }
  
    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.role || null;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  getToken():any{
    let token = localStorage.getItem('token');
    return true;
  }
}




