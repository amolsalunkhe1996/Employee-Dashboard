# EmployeeManagementDash

Employee Management Dashboard built using Angular 16.2.16 and JSON Server.

## Technologies Used

* Angular 16.2.16
* TypeScript
* RxJS
* Reactive Forms
* Bootstrap
* JSON Server

## Development Server

Install the project dependencies:

```bash
npm install
```

Start JSON Server:

```bash
npx json-server db.json --port 3000
```

Open another terminal and start the Angular application:

```bash
ng serve
```

Then open the application in the browser:

```text
http://localhost:4200/
```

The application redirects to the Employee List page.

## Application Flow

After starting the application:

```text
Employee List
     │
     ├── Add Employee
     │
     ├── Edit Employee
     │
     ├── Employee Details
     │
     └── Delete Employee
```

Employee List includes search, filter, sorting and pagination.

## Project Structure

```text
src/app/
│
├── components/
│   ├── employee-list/
│   ├── add-employee/
│   └── employee-details/
│
├── models/
│   └── employee-model.ts
│
├── services/
│   └── employee-service.service.ts
│
├── app-routing.module.ts
└── app.module.ts
```

## API

JSON Server is used as a mock backend.

```text
http://localhost:3000/employees
```

The service handles GET, POST, PUT and DELETE operations.

## Search

Employee search uses RxJS operators such as:

```text
debounceTime()
distinctUntilChanged()
switchMap()
```

This helps to avoid unnecessary API requests while typing.

## Forms

Reactive Forms are used for Add and Edit operations.

The same form component is reused for both operations. In Edit mode, existing employee data is loaded from the API and populated using `patchValue()`.

## Routing

The application uses Angular Router for navigation.

```text
/                         → Redirect to /employees
/employees                → Employee List
/employees/add            → Add Employee
/employees/edit/:id       → Edit Employee
/employees/:id            → Employee Details
```

## Error and Loading Handling

Loading indicators are shown during API calls and appropriate error messages are displayed when an API request fails.

After Add, Edit or Delete, the employee list is updated without a full page refresh.

## Build

To create a production build:

```bash
ng build
```

The build output will be available in the `dist/` folder.

## Notes

* JSON Server is used because a real backend API was not provided.
* The project focuses on Angular fundamentals, clean code and reusable components.
* `takeUntil()` is used for subscription cleanup.
