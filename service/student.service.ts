import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://localhost:8080';
  
  constructor(private http: HttpClient) {}

  getStudents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/students`, { headers: this.createHeaders() });
  }

  getStudentData(reg_no: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/student/${reg_no}`, { headers: this.createHeaders() });
  }

  getStudentName(reg_no: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/student/${reg_no}`, { headers: this.createHeaders() });
  }

  registerStudent(studentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/student/register`, studentData, { headers: this.createHeaders() });
  }

  updateStudent(reg_no: string, studentData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/student/${reg_no}`, studentData, { headers: this.createHeaders() });
  }

  deleteStudent(reg_no: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/student/${reg_no}`, { headers: this.createHeaders() });
  }

  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  }
}
