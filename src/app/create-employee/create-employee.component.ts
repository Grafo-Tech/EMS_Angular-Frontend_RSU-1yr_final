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
    skills: [] as string[]// Initialize selectedSkills as an empty array
  };

  positions = ['Manager', 'Developer','Analyst', 'Designer'];
  genders = ['Male', 'Female'];
  skills = ['Java', 'Angular', 'Python', 'React'];

    showToast: boolean = false;
    successMessage: string = '';

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    
   }

   onSubmit(form: NgForm): void {
    if (form.valid) {
      this.employeeService.createEmployee(this.employee).subscribe(() => {
        this.successMessage = 'Employee Saved successfully!';
        this.showToast = true;

        form.resetForm();
        this.employee.skills = [];
        
        setTimeout(() => {
          this.hideToast();
          this.router.navigate(['/employees']);
        }, 3000);
      });
    }
  }

  hideToast(): void {
    this.showToast = false;
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
