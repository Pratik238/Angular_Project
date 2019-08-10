import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData: Employee;
  list: Employee[];

  readonly rootUrl = "http://angularapi.local.com/api";

  constructor(private http: HttpClient) { }

  postEmployee(formData: Employee) {
    return this.http.post(this.rootUrl + '/Employee', formData);
  }
  refreshlist() {
    this.http.get(this.rootUrl + '/Employee')
      .toPromise().then(res => this.list = res as Employee[]);
  }
  putEmployee(formData: Employee) {
    return this.http.put(this.rootUrl + '/Employee/' + formData.EmployeeID, formData);
  }
  deleteEmployee(id: number) {
    return this.http.delete(this.rootUrl + '/Employee/' + id);
  }
}
