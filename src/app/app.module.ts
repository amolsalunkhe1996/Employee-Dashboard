import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './user/employee-list/employee-list.component';
import { AddEmployeeComponent } from './user/add-employee/add-employee.component';
import { ViewEmployeeComponent } from './user/view-employee/view-employee.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    NgSelectModule
    
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
