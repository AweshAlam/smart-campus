import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClassScheduleService {
  private apiUrl = 'http://localhost:8080/admin';

  constructor(private http: HttpClient) {}

  createClassSchedule(classSchedule: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/schedule/add`, classSchedule, {
      headers: this.createHeaders(),
    });
  }

  getClassSchedules(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/schedules`, {
      headers: this.createHeaders(),
    });
  }

  updateClassSchedule(id: string, classSchedule: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/schedule/${id}`, classSchedule, {
      headers: this.createHeaders(),
    });
  }

  deleteClassSchedule(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/schedule/${id}`, {
      headers: this.createHeaders(),
    });
  }

  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }
}
