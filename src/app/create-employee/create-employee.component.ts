import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employee: any = {
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    gender: '',
    selectedSkills: [] // Initialize selectedSkills as an empty array
  };

  positions = ['Manager', 'Developer','Analyst', 'Designer'];
  genders = ['Male', 'Female'];
  skills = ['Java', 'Angular', 'Python', 'React'];

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.employee.selectedSkills = new Array(this.skills.length).fill(false);
   }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.employeeService.createEmployee(this.employee).subscribe(() => {
        this.router.navigate(['/employees']); // Redirect after save
      });
    }
  }

  clearForm(form: NgForm) {
    form.resetForm();
  }
}
