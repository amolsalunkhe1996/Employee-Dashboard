import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

const routes: Routes = [
  {
    path:'',
    component:EmployeeListComponent
  },
  {
    path:'detail/:id',
    component:ViewEmployeeComponent
  },
  {
    path:'add',
    component:AddEmployeeComponent
  },
  {
    path:'edit/:id',
    component:AddEmployeeComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
