import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  constructor(public service: EmployeeService, private toastr: ToastrService) { }
  //********************
  ngOnInit() {
    this.resetForm();
  }
  //********************
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = {
      EmployeeID: null,
      FullName: '',
      EMPCode: '',
      Mobile: '',
      Position: ''
    }
  }
  //********************
  onSubmit(form: NgForm) {
    if (form.value.EmployeeID == null) {
      this.inserRecord(form);
    }
    else {
      this.updateRecord(form);
    }
  }
  //********************
  inserRecord(form: NgForm) {
    this.service.postEmployee(form.value).subscribe(res => {
      this.toastr.success('Inserted successfully', 'EMP. Register');
      this.resetForm(form);
      this.service.refreshlist();
    });
  }
  updateRecord(form: NgForm) {
    this.service.putEmployee(form.value).subscribe(res => {
      this.toastr.info('Updated successfully', 'EMP. Register');
      this.resetForm(form);
      this.service.refreshlist();
    });
  }

}
