import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { UserData } from '../model/user';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'familyName',
    'birthday',
    'ostan',
    'shahr',
    'manegment',
  ];
  dataSource!: MatTableDataSource<UserData[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.api.getUser().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editUser(row: UserData[]) {
    this.dialog.open(DialogComponent, {
      data: row,
    });
  }

  deleteUser(id: number) {
    this.api.deletUser(id).subscribe({
      next: (res) => {
        alert('کاربر حذف شد !');
        this.getAll();
      },
    });
  }
}
