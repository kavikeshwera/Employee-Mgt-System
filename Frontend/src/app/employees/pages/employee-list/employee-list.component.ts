import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Employee, EmployeeService } from '../../../core/employee.service';
import { EmployeeFormDialogComponent } from '../../components/employee-form-dialog/employee-form-dialog.component';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatDialogModule
  ],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  data: Employee[] = [];
  cols = ['name', 'position', 'department', 'salary', 'actions'];
  q = '';

  constructor(
    private api: EmployeeService,
    private dlg: MatDialog,
    private sb: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.api.list().subscribe(res => {
      const q = this.q.toLowerCase();
      this.data = res.filter(x => !q || JSON.stringify(x).toLowerCase().includes(q));
    });
  }

  search(value: string) {
    this.q = value;
    this.load();
  }

  openForm(emp?: Employee) {
    this.dlg.open(EmployeeFormDialogComponent, { width: '420px', data: emp })
      .afterClosed()
      .subscribe((ok: boolean) => {
        if (ok) {
          this.sb.open('Saved', 'OK', { duration: 1200 });
          this.load();
        }
      });
  }

  confirmDelete(emp: Employee) {
    this.dlg.open(ConfirmDialogComponent, {
      width: '360px',
      data: { title: 'Delete', message: `Delete ${emp.name}?` }
    })
    .afterClosed()
    .subscribe((ok: boolean) => {
      if (!ok) return;
      this.api.remove(emp.id).subscribe({
        next: () => {
          this.sb.open('Deleted', 'OK', { duration: 1200 });
          this.load();
        },
        error: () => this.sb.open('Delete failed', 'OK', { duration: 1500 })
      });
    });
  }
}
