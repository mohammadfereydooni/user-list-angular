import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  jenders=['مرد' , 'زن'];

  userList!:FormGroup;

  upbtn:string = "ثبت"

  hide = true;

  constructor(private formbuilder : FormBuilder , private api:ApiService,  @Inject(MAT_DIALOG_DATA) public editdata: any){}

  ngOnInit(): void {
    this.userList = this.formbuilder.group({
      name: ['', Validators.required],
      familyName: ['', Validators.required],
      password: ['', Validators.required],
      birthday: ['', Validators.required],
      jenders: ['', Validators.required],
      ostan: ['', Validators.required],
      shahr: ['', Validators.required]

    })
    if (this.editdata){
      this.upbtn = 'به روز رسانی'
      this.userList.controls['name'].setValue(this.editdata.name);
      this.userList.controls['familyName'].setValue(this.editdata.familyName);
      this.userList.controls['birthday'].setValue(this.editdata.birthday);
      this.userList.controls['jenders'].setValue(this.editdata.jenders);
      this.userList.controls['ostan'].setValue(this.editdata.ostan);
      this.userList.controls['shahr'].setValue(this.editdata.shahr);
    }
  }


  reigester(){
  if (!this.editdata){
    if (this.userList.valid){
      this.api.postUser(this.userList.value).subscribe({
        next:(res)=>{
          alert ("کاربر با موفقیت ثبت شد");
          location.reload();
        },
        error:()=>{
          alert("ثبت انجام نشد")
        }
      })
     }
     else{
      alert("لطفا فرم را با دقت پر کنید")
     }
  }
  else{
    this.updateUser()
  }

  }

  updateUser(){
    this.api.putUser(this.userList.value, this.editdata.id).subscribe({
      next:(res)=>{
        alert("تغییرات اعمال شد !");
        this.userList.reset();
        location.reload();
      }
    })
  }

 

}
