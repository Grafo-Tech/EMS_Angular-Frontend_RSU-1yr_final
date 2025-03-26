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

  searchQuery: string = ''; 
  filteredEmployees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees() {
    this.employeeService.getAllEmployees().subscribe(data => {
      this.employees = data;
      this.filteredEmployees = [...data]; // Initialize filtered list with all employees
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
      this.getEmployees();  // Refresh list after deletion
      this.closeDeleteModal();
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
}
