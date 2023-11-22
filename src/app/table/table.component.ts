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
import { FormControl } from '@angular/forms';
import { th } from 'date-fns/locale';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  userName!: string | null;

  userRole$!: number;

  acces!: boolean;

  toppingList: string[] = [
    'شنبه',
    'یکشنبه',
    'دوشنبه',
    'سه شنبه',
    'چهارشنبه',
    'پنجشنبه',
  ];

  displayedColumns: string[] = [
    'id',
    'name',
    'familyName',
    'birthday',
    'ostan',
    'shahr',
    'manegment',
    'select',
  ];
  dataSource!: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private api: ApiService,
    public dialog: MatDialog,
    private auth: AuthService
  ) {}
  ngOnInit(): void {
    this.getAll();

    this.auth.userRoles.subscribe({
      next: (role) => {
        if (role == 'admin') {
          this.userRole$ = 1;
        } else this.userRole$ = 2;
      },
    });
    console.log(this.userRole$);

    this.userName = this.auth.getUsername();

    console.log(this.userName);
  }

  getAll() {
    this.api.getUsers().subscribe({
      next: (res: UserData[]) => {
        this.dataSource = new MatTableDataSource(
          res.filter((data) => data.name.trim() === this.userName)
        );
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
    this.api.deleteUser(id).subscribe({
      next: (res) => {
        alert('کاربر حذف شد !');
        this.getAll();
      },
    });
  }

  yes(row: UserData) {
    console.log(row.attendance);

    console.log(row);

    this.api.putUser(row, row.id).subscribe({
      next: (res) => {
        alert('تغییرات اعمال شد !');
      },
    });
  }
}
