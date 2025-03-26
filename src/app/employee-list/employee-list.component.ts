import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  
  employees: Employee[] = [];
  employeeToDelete!: number;
  isDeleteModalOpen: boolean = false;

  searchQuery: string = ''; 
  filteredEmployees: Employee[] = [];

  showToast: boolean = false;
  successMessage: string = '';

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees() {
    this.employeeService.getAllEmployees().subscribe(data => {
      this.employees = data;
      this.filteredEmployees = [...data];
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
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
  }

  confirmDelete() {
    this.employeeService.deleteEmployee(this.employeeToDelete).subscribe(() => {
      this.successMessage = 'Deleted Successfully!';
      this.showToast = true;

      this.getEmployees(); // Refresh list after deletion
      this.closeDeleteModal();

      // Auto-hide toast after 3 seconds
      setTimeout(() => {
          this.hideToast();
      }, 3000);
    });
  }

  filterEmployees() {
    const query = this.searchQuery.toLowerCase().trim();
    this.filteredEmployees = this.employees.filter(employee =>
      employee.firstName.toLowerCase().includes(query) ||
      employee.lastName.toLowerCase().includes(query)
    );
 }

  clearSearch() {
    this.searchQuery = '';
    this.filteredEmployees = [...this.employees];
  }

  hideToast(): void {
    this.showToast = false;
  }
}
