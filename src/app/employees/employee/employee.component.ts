import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FlagService } from 'src/app/flag.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  constructor(public service: EmployeeService,private flag: FlagService,
    private toastr: ToastrService) { }
    Category=['One','Two','Three'];
    Tag=["1","2","3"]
 button=0;
 black: boolean= false;
  ngOnInit() {
    this.resetForm();
    }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
     _id: "",
      Title: '',
      Category: '',
      Description: '',
      Tags: '', 
    }  
     this.flag.updateflag(true);
  }


  onSubmit(form: NgForm) {

     if (form.value._id == "")
      {this.insertRecord(form);
         
        
      }
    else
     { this.updateRecord(form); 
    
     }
  }
  
  onButtom(form: NgForm) {

    if (form.value._id == "")
   { 
   return 1;
   }
   else{
    
    return 2;
   }
 }

  insertRecord(form: NgForm) {
    this.service.postEmployee(form.value).subscribe(res => {
      this.toastr.success('Inserted successfully', 'Item Added');
      this.resetForm(form);
      this.service.refreshList();
    });
  }

  updateRecord(form: NgForm) {
    this.service.putEmployee(form.value).subscribe(res => {
      this.toastr.info('Updated successfully', 'Item Updated');
      this.resetForm(form);
      this.service.refreshList();
    });

  }


}
