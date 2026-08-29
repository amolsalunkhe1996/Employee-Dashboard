import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Employee } from 'src/app/models/employee-modal';
import { EmployeeService } from 'src/app/services/employee-service.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent {

  employee: Employee | null = null;
  loading: boolean = true;
  error: string = '';
  editId:string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    if(this.route.snapshot.paramMap.get('id')){
       this.editId = this.route.snapshot.paramMap.get('id');
    }

    if (this.editId) {
      this.fetchEmployeeById(this.editId);
    } else {
      this.error = 'Invalid Employee ID';
      this.loading = false;
    }
  }

  fetchEmployeeById(id: string) {
    this.loading = true;
    this.employeeService.getEmployeeById(this.editId).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data: Employee) => {
        this.employee = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Employee record not found.';
        this.loading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/employees']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
