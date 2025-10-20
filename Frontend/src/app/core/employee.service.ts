import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  salary: number;
}

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private base = `${environment.apiUrl}/employees`; // environment.apiUrl must be http(s)://localhost:5012/api
  constructor(private http: HttpClient) {}

  list() { return this.http.get<Employee[]>(this.base); }
  get(id: number) { return this.http.get<Employee>(`${this.base}/${id}`); }
  create(payload: Omit<Employee,'id'>) { return this.http.post<Employee>(this.base, payload); }
  update(id: number, payload: Employee) { return this.http.put<void>(`${this.base}/${id}`, payload); }
  remove(id: number) { return this.http.delete<void>(`${this.base}/${id}`); }
}
