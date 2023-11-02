import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, elementAt } from 'rxjs';
import { UserData } from 'src/app/model/user';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  allUsers!: UserData[];

  // login :boolean = false;
  login: boolean = false;

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private api: ApiService, private authServices:AuthService,private router:Router) {}

  ngOnInit(): void {}

  singup() {


      this.authServices.singup(this.form.value.username as string,this.form.value.password as string);

      this.router.navigate(['/inbox']);


    // this.api.getUsers().subscribe({
    //   next: (res) => {
    //     this.allUsers = res;
    //     this.allUsers.forEach((Element) => {
    //       if (Element.name.trim() == this.form.value.username?.trim() && Element.password == this.form.value.password) {
    //         this.login = true;


    //       }
    //     });
    //   },
    // });


  }
}
