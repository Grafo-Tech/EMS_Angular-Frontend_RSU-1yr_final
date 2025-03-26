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
    skills: [] as string[] // Initialize selectedSkills as an empty array
  };

  positions = ['Manager', 'Developer','Analyst', 'Designer'];
  genders = ['Male', 'Female'];
  skills = ['Java', 'Angular', 'Python', 'React'];

  id: number = 0;
  errorMessage: string = '';

  showToast: boolean = false;
  successMessage: string = '';

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

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.employeeService.createEmployee(this.employee).subscribe(() => {
        this.successMessage = 'Employee Updated successfully!';
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
      this.employee.skills.push(skill); // Add skill when checked
    } else {
      this.employee.skills = this.employee.skills.filter((s: string) => s !== skill); // Remove skill when unchecked
    }
  }
  
  clearForm(form: NgForm) {
      form.resetForm();
      this.employee.skills = [];
  }
}
