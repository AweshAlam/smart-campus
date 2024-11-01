import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class StudentRegistrationService {

  
//   url = "http://localhost:8080/admin/student/register";

//   constructor(private http: HttpClient) { }

//   registerStudent(studentData: { reg_no: string, s_name: string, email: string, mob_no: string }): Observable<any> {
//     return this.http.post(this.url, studentData);
//   }
// }


 apiUrl = 'http://localhost:8080/admin/student/register';

  constructor(private http: HttpClient) {}

  registerStudent(studentData: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found in localStorage');
    }

    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
    });

    console.log('header');

    console.log("Content-Type:", headers.get('Content-Type'));
    console.log("Authorization:", headers.get('Authorization'));

    return this.http.post(this.apiUrl, studentData, { headers, withCredentials: true });
}
}