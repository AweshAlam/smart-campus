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

  updateClassSchedule(cs_id: number, classSchedule: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/schedule/${cs_id}`, classSchedule, {
      headers: this.createHeaders(),
    });
  }

  deleteClassSchedule(cs_id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/schedule/${cs_id}`, {
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
