import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { UserData } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  allUsers!:UserData[];

  constructor(private api:ApiService) {
    const loggedIn = !!localStorage.getItem('username');
    this.isLoggedInSubject.next(loggedIn);

   }

   singup(username:string, password:string){
    this.api.getUsers().subscribe({
      next: (res) => {
        this.allUsers = res;
        this.allUsers.forEach((Element) => {
          if (Element.name.trim() == username?.trim() && Element.password == password) {
            this.isLoggedInSubject.next(true);
              console.log(this.isLoggedInSubject);

          }
        });
      },
    });
   }
   get isLoggedIn() {
    return this.isLoggedInSubject.asObservable();
  }
}
