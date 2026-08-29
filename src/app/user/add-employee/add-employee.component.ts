import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import {  EmployeePayload } from 'src/app/models/employee-modal';
import { EmployeeService } from 'src/app/services/employee-service.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {


  employeeForm: FormGroup;
  isEditMode: boolean = false;
  editId: string | null = null;
  loading: boolean = false;
  submitting: boolean = false;
  error: string = '';

  departments: string[] = ['IT', 'HR', 'Finance', 'Marketing', 'Operations', 'Sales'];
  statuses: string[] = ['Active', 'Inactive'];

  private destroy$ = new Subject<void>();
  today:any

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {

    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      department: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      joiningDate: ['', [Validators.required]],
      salary: ['', [Validators.required, Validators.min(1)]],
      status: ['Active', [Validators.required]]
    });

  }

  ngOnInit(): void {

      const today = new Date();
     this.today = today.toISOString().split('T')[0];


    this.editId = this.route.snapshot.paramMap.get('id');
    if (this.editId) {
      this.isEditMode = true;
      this.getEditObject(this.editId);
    }
  }


  getEditObject(id: string) {
    this.loading = true;
    this.employeeService.getEmployeeById(id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        if (data) {
          let formattedDate = data.joiningDate;
          if (data.joiningDate) {
            formattedDate = new Date(data.joiningDate).toISOString().split('T')[0];
          }
          this.employeeForm.patchValue({
            name: data.name,
            email: data.email,
            phone: data.phone,
            department: data.department,
            designation: data.designation,
            joiningDate: formattedDate,
            salary: data.salary,
            status: data.status
          });
        }
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load employee details.';
        this.loading = false;
      }
    });
  }

  onSubmit() {

    if (this.employeeForm?.valid) {

      this.submitting = true;
      this.error = '';

      const payload: EmployeePayload = this.employeeForm.value;

      if (this.isEditMode && this.editId) {
        this.employeeService.updateEmployee(this.editId, payload).pipe(
          takeUntil(this.destroy$)
        ).subscribe({
          next: () => {
            this.submitting = false;
            this.router.navigate(['/employees']);
          },
          error: () => {
            this.error = 'Failed to update employee. Please try again.';
            this.submitting = false;
          }
        });
      } else {
        this.employeeService.addEmployee(payload).pipe(
          takeUntil(this.destroy$)
        ).subscribe({
          next: () => {
            this.submitting = false;
            this.router.navigate(['/employees']);
          },
          error: () => {
            this.error = 'Failed to add employee. Please try again.';
            this.submitting = false;
          }
        });
      }

    }
    else {
      this.employeeForm.markAllAsTouched();
      return;
    }
  }

  get f() {
    return this.employeeForm.controls;
  }

  onCancel() {
    this.router.navigate(['/employees']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
