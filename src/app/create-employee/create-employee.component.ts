import { Component, OnInit } from '@angular/core';
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
    skills: []
  };

  positions = ['Manager', 'Developer','Analyst', 'Designer'];
  genders = ['Male', 'Female'];
  skills = ['Java', 'Angular', 'Python', 'React'];

  showToast: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      this.errorMessage = 'Please fill all required fields (expect skills).';
      this.showToast = true;
      setTimeout(() => this.hideToast(), 3000);
      return;
    }

    this.employeeService.createEmployee(this.employee).subscribe(() => {
      this.successMessage = 'Employee Saved successfully!';
      this.errorMessage = '';
      this.showToast = true;

      form.resetForm();
      this.employee.skills = [];

      setTimeout(() => {
        this.hideToast();
        this.router.navigate(['/employees']);
      }, 3000);
    });
  }

  hideToast(): void {
    this.showToast = false;
    this.successMessage = '';
    this.errorMessage = '';
  }

  onSkillChange(event: any, skill: string) {
    if (event.target.checked) {
      this.employee.skills.push(skill);
    } else {
      this.employee.skills = this.employee.skills.filter((s: string) => s !== skill);
    }
  }

  clearForm(form: NgForm) {
    form.resetForm();
    this.employee.skills = [];
  }
}
