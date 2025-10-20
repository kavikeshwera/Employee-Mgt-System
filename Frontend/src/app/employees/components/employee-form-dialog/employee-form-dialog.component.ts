import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { EmployeeService, Employee } from '../../../core/employee.service';

@Component({
  selector: 'app-employee-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './employee-form-dialog.component.html',
  styleUrls: ['./employee-form-dialog.component.scss']
})
export class EmployeeFormDialogComponent {
  form!: FormGroup; // declare only

  constructor(
    private fb: FormBuilder,
    private api: EmployeeService,
    private ref: MatDialogRef<EmployeeFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: Employee
  ) {
    // ✅ build the form *after* fb is injected
    this.form = this.fb.group({
      id: [data?.id ?? 0],
      name: [data?.name ?? '', Validators.required],
      position: [data?.position ?? '', Validators.required],
      department: [data?.department ?? '', Validators.required],
      salary: [data?.salary ?? 0, [Validators.required, Validators.min(0)]]
    });
  }

  save() {
    const v = this.form.value as Employee;
    const call: Observable<any> = v.id
      ? this.api.update(v.id, v)
      : this.api.create({
          name: v.name,
          position: v.position,
          department: v.department,
          salary: v.salary
        } as Omit<Employee, 'id'>);

    call.subscribe({ next: () => this.ref.close(true) });
  }
}
