import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserData, day } from '../model/user';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  data!: UserData[];


    today:number = Date.now();



  toppings = new FormControl('');

  toppingList: day[] = [
    {
      name: 'شنبه',
      count: 0,
    },
    {
      name: 'یکشنبه',
      count: 0,
    },
    {
      name: 'دوشنبه',
      count: 0,
    },
    {
      name: 'سه شنبه',
      count: 0,
    },
    {
      name: 'چهارشنبه',
      count: 0,
    },
    {
      name: 'پنجشنبه',
      count: 0,
    },
  ];

  displayedColumns: string[] = ['id', 'name', 'familyName', 'attendance'];
  dataSource!: MatTableDataSource<UserData[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.api.getUsers().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.data = res;

        this.data.forEach((Element) => {
          this.toppingList.forEach((t) => {
            const sh = (Element.attendance as string[]).find(
              (e) => e === t.name
            );
            if (sh) {
              t.count++;
            }
          });
        });


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
}
