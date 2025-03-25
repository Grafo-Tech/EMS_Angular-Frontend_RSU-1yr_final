import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  
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

  id: number = 0;
  errorMessage: string = '';

  constructor(private employeeService: EmployeeService,
     private route: ActivatedRoute,
     private router: Router) { }
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']; // Get the ID from the route

    this.employeeService.getEmployeeById(this.id).subscribe(
      data => {
        this.employee = data;
      }, 
      error => console.log(error)
    );
  }

  onSubmit() {
    this.employeeService.updateEmployee(this.id, this.employee)
    .subscribe(data => {
      this.goToEmployeeList();
    },
      error => console.log(error)
    );
  } 
  
  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }
  clearForm(form: NgForm) {
      form.resetForm();
  }
}
