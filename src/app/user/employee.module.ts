import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeRoutingModule } from './employee-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
     EmployeeListComponent,
    AddEmployeeComponent,
    ViewEmployeeComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeeRoutingModule,
    FormsModule,
    NgSelectModule
    
  ]
})
export class EmployeeModule { }
