import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Employee } from './employee';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL = 'http://localhost:8080/api/v1/employees';

  constructor(private httpClient: HttpClient) {
   }

  getAllEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.baseURL}`);
  }

  createEmployee(employee: Employee): Observable<object> {
    return this.httpClient.post(`${this.baseURL}`, employee);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.baseURL}/${id}`);
  }

  getEmployeeByName(name: string): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.baseURL}/${name}`);
  }
  
  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.httpClient.put<Employee>(`${this.baseURL}/${id}`, employee);
  }
  
  deleteEmployee(id: number): Observable<Employee> {
    return this.httpClient.delete<Employee>(`${this.baseURL}/${id}`);
  }

}
