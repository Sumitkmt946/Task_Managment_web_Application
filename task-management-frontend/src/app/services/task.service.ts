import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, ApiResponse } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/api/tasks';

  constructor(private http: HttpClient) { }

  getTasks(filters?: any): Observable<ApiResponse<Task[]>> {
    let params = new HttpParams();
    
    if (filters) {
      if (filters.taskType && filters.taskType !== 'all') {
        params = params.set('taskType', filters.taskType);
      }
      if (filters.status && filters.status !== 'all') {
        params = params.set('status', filters.status);
      }
      if (filters.contactPerson && filters.contactPerson !== 'all') {
        params = params.set('contactPerson', filters.contactPerson);
      }
      if (filters.search) {
        params = params.set('search', filters.search);
      }
    }

    return this.http.get<ApiResponse<Task[]>>(`${this.apiUrl}/tasks`, { params });
  }

  createTask(task: Partial<Task>): Observable<ApiResponse<Task>> {
    return this.http.post<ApiResponse<Task>>(`${this.apiUrl}/tasks`, task);
  }

  updateTask(taskId: string, task: Partial<Task>): Observable<ApiResponse<Task>> {
    return this.http.put<ApiResponse<Task>>(`${this.apiUrl}/tasks/${taskId}`, task);
  }

  deleteTask(taskId: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/tasks/${taskId}`);
  }

  duplicateTask(taskId: string): Observable<ApiResponse<Task>> {
    return this.http.post<ApiResponse<Task>>(`${this.apiUrl}/tasks/${taskId}/duplicate`, {});
  }

  changeTaskStatus(taskId: string, status: 'Open' | 'Closed'): Observable<ApiResponse<Task>> {
    return this.http.patch<ApiResponse<Task>>(`${this.apiUrl}/tasks/${taskId}/status`, { status });
  }

  getTeamMembers(): Observable<ApiResponse<string[]>> {
    return this.http.get<ApiResponse<string[]>>(`${this.apiUrl}/team-members`);
  }
}