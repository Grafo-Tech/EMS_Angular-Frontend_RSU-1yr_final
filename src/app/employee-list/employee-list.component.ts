import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  
  employees: Employee[] = [];
  employeeToDelete!: number;
  isDeleteModalOpen: boolean = false;

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees() {
    this.employeeService.getAllEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  updateEmployee(id: number) {
    this.router.navigate(['update-employee', id]);
  }

  employeeDetails(id: number) {
    this.router.navigate(['employee-details', id]);
  }

  openDeleteModal(id: number) {
    this.employeeToDelete = id;
    this.isDeleteModalOpen = true;  // ✅ Show modal
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;  // ✅ Hide modal
  }

  confirmDelete() {
    if (this.employeeToDelete !== null) {
      this.employeeService.deleteEmployee(this.employeeToDelete).subscribe(() => {
        this.getEmployees();
        this.closeDeleteModal();
      });
    }
  }
}
