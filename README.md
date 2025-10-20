# 🧭 Employee Management System

A full-stack CRUD application for managing employee records — built with **ASP.NET Core Web API (Backend)** and **Angular + Material UI (Frontend)**.

---

## 🧱 Backend (ASP.NET Core Web API)

**Folder:** `/Backend`

### 🔹 Features
- ASP.NET Core 8 Web API  
- Entity Framework Core with SQL Server  
- CRUD operations for Employees  
- Swagger UI for API testing  
- CORS enabled for Angular frontend

### 🔹 Setup & Run
cd Backend
dotnet restore
dotnet run
The API will start (default port shown in console, e.g. http://localhost:5012).

🔹 Test the API
Open Swagger UI in your browser:
👉 http://localhost:5012/swagger/index.html

💻 Frontend (Angular + Material UI)
Folder: /Frontend/employee-ui

🔹 Features
Angular 18 + Angular Material

Employee list table with add/edit/delete

Reactive Forms for input validation

REST API integration with backend

Responsive design using Poppins font & modern colors

🔹 Setup & Run
```bash
cd Frontend/employee-ui
npm install
ng serve -o
```
Runs by default at 👉 http://localhost:4200

🔗 API & Frontend Connection
The backend allows cross-origin requests from Angular via:

http://localhost:4200
Configured in Program.cs with:

```bash
builder.Services.AddCors(options =>
{
    options.AddPolicy("ng", policy =>
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod());
});
app.UseCors("ng");
```

🗄️ Database

Database Name: EmployeeCrudDb

Table: Employees

SQL Script Example
```bash
sql

CREATE TABLE Employees (
  Id INT PRIMARY KEY IDENTITY(1,1),
  Name NVARCHAR(100),
  Position NVARCHAR(100),
  Department NVARCHAR(100),
  Salary DECIMAL(10,2)
); 
```
🧪 Testing Tools
Swagger UI → API endpoint testing

Postman → optional JSON-based test collection

Angular UI → verify CRUD visually

📸 Screenshots
📌 Backend – Swagger UI
📌 Frontend – Employee List / Add / Edit / Delete

(Screenshots included in via Google Drive/Docs.)

⚙️ Tech Stack
Layer	Technology
Backend	ASP.NET Core 8, C#, EF Core
Database	SQL Server
Frontend	Angular 18, TypeScript, Angular Material
Tools	VS Code, SSMS, Node.js, GitHub

🧾 Author
Developed by: Koshala Kavikeshwera
Date: October 2025
Submitted for: BIT Assignment — Full Stack CRUD Application

💡 Run the backend first, then the frontend. Ensure both ports match (http://localhost:5012 and http://localhost:4200) for successful API calls.
