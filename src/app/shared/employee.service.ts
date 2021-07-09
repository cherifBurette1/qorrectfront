import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData: Employee = new Employee;
  list: Employee[] = [];
  readonly rootURL ="https://mysterious-sierra-02206.herokuapp.com/api/productModel/"
 

  constructor(private http : HttpClient) { }

  postEmployee(formData : Employee){
 return this.http.post(this.rootURL, formData)
        }

  
  refreshList(){
    this.http.get(this.rootURL)
    .toPromise().then(res =>{console.log(res.toString()); {this.list = res as Employee[]}});

  }

  putEmployee(formData : Employee){
    console.log(formData._id);  
    var data = {
      "Title":this.formData.Title,
      "Category": this.formData.Category,
      "Description": this.formData.Description,
      "Tags": this.formData.Tags
    }
    return this.http.put(this.rootURL+formData._id,data);

   }

   deleteEmployee(id : string){
    return this.http.delete(this.rootURL+id);
   }
}
