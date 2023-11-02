import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent  } from '../dialog/dialog.component';
import {ApiService} from "../services/api.service";
import {UserData} from "../model/user";
import {delay} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  data!: UserData[];
  constructor(public dialog: MatDialog,private api:ApiService) {}





  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

   async resetWeek(){

    this.api.getUsers().subscribe((res)=> {
      this.data=res
      this.data.forEach(async(user)=>{
        this.api.updateUser({attendance:[]},user.id).subscribe((res)=>{
        })
      })
      window.alert("هفته جدید آغاز شد")
      location.reload()
    })
  }
}
