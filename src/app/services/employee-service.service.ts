import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Employee, EmployeePayload } from '../models/employee-modal';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly apiURL = "http://localhost:3000/employees";

  constructor(
    private http: HttpClient
  ) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiURL);
  }

  getEmployeeById(id: string|null): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiURL}/${id}`);
  }

  addEmployee(employee: EmployeePayload): Observable<Employee> {
    return this.http.post<Employee>(this.apiURL, employee);
  }

  updateEmployee(id:string,employee: EmployeePayload): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiURL}/${id}`, employee)
  }

  deleteEmployee(id: string) {
    return this.http.delete(`${this.apiURL}/${id}`)
  }

getEmployeesServerSide(paramsObj: any): Observable<Employee[]> {
    let params = new HttpParams();

    if (paramsObj.search) {
      params = params.set('name', paramsObj.search);
    }

    if (paramsObj.dept) {
      params = params.set('department', paramsObj.dept);
    }

    if (paramsObj.status) {
      params = params.set('status', paramsObj.status);
    }

    return this.http.get<Employee[]>(this.apiURL, { params });
  }
}