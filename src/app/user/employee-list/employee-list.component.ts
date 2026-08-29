import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { Employee } from 'src/app/models/employee-modal';
import { EmployeeService } from 'src/app/services/employee-service.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnDestroy {

  serverEmployees: Employee[] = [];   
  employees: Employee[] = [];

  loading = signal<boolean>(true);
  error = signal<string>('');

  searchTerm: string = '';
  selectedDept: string = '';
  selectedStatus: string = '';

  currentPage: number = 1;
  pageSize: number = 3;
  totalPages: number = 1;
  visiblePages: (number | string)[] = [];

  departmentOptions = [
    { label: 'All Departments', value: '' },
    { label: 'IT', value: 'IT' },
    { label: 'HR', value: 'HR' },
    { label: 'Finance', value: 'Finance' },
    { label: 'Marketing', value: 'Marketing' }
  ];

  statusOptions = [
    { label: 'All Statuses', value: '' },
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' }
  ];

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(300),
      takeUntil(this.destroy$)
    ).subscribe((term: string) => {
      this.searchTerm = term.toLowerCase().trim();
      this.currentPage = 1; 
      this.updatePaginatedData();
    });

    this.getEmployeesList();
  }

  getEmployeesList() {
    const params: any = {};
    
    this.loading.set(true);
    this.error.set('');

    if (this.selectedStatus) {
      params['status'] = this.selectedStatus;
    }

    if (this.selectedDept) {
      params['dept'] = this.selectedDept;
    }

    this.employeeService.getEmployeesServerSide(params).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data: Employee[]) => {
        this.serverEmployees = data;
        this.updatePaginatedData();
        this.loading.set(false); 
      },
      error: () => {
        this.error.set('Failed to load employees. Please check server connection.');
        this.loading.set(false);
      }
    });
  }

  updatePaginatedData() {
    let filteredList = this.serverEmployees;

    if (this.searchTerm) {
      filteredList = this.serverEmployees.filter(emp => 
        (emp.name && emp.name.toLowerCase().includes(this.searchTerm)) ||
        (emp.email && emp.email.toLowerCase().includes(this.searchTerm))
      );
    }

    this.totalPages = Math.ceil(filteredList.length / this.pageSize) || 1;

    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
    if (this.currentPage < 1) {
      this.currentPage = 1;
    }

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.employees = filteredList.slice(startIndex, endIndex);

    this.generatePagination();
  }

  generatePagination() {
    const pages: (number | string)[] = [];
    const total = this.totalPages;
    const current = this.currentPage;

    if (total <= 5) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (current > 3) pages.push('...');

      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (current < total - 2) pages.push('...');
      pages.push(total);
    }

    this.visiblePages = pages;
  }

  onSearchChange(searchValue: string) {
    this.searchSubject.next(searchValue);
  }

  onDeptChange(event: any) {
    this.selectedDept = event ? (event.value !== undefined ? event.value : event) : '';
    this.currentPage = 1;
    this.getEmployeesList();
  }

  onStatusChange(event: any) {
    this.selectedStatus = event ? (event.value !== undefined ? event.value : event) : '';
    this.currentPage = 1;
    this.getEmployeesList();
  }

  onPageChange(page: number | string) {
    if (typeof page === 'number' && page !== this.currentPage) {
      this.currentPage = page;
      this.updatePaginatedData();
    }
  }

  deleteEmployee(id: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: () => {
          this.getEmployeesList();
        },
        error: () => alert('Failed to delete employee. Please try again.')
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}