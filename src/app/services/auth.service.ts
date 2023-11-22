import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { UserData } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private userRolesSubject = new BehaviorSubject<string>("");
  allUsers!:UserData[];

  constructor(private api:ApiService) {
    const loggedIn = !!localStorage.getItem('name');
    this.isLoggedInSubject.next(loggedIn);

    const savedUserRole = localStorage.getItem('userRole');

   }

   singup(username:string, password:string){
    this.api.getUsers().subscribe({
      next: (res) => {
        this.allUsers = res;
        this.allUsers.forEach((Element) => {
          if (Element.name.trim() == username?.trim() && Element.password == password) {
            const roles = Element.userRole
            this.isLoggedInSubject.next(true);
            this.userRolesSubject.next(roles);

            this.saveUsername(username);

              console.log(this.isLoggedInSubject);
              console.log(this.userRolesSubject);

          }
        });
      },
    });
   }
   get isLoggedIn() {
    return this.isLoggedInSubject.asObservable();
  }



  set userRole(role: number | null | undefined) {
    // ذخیره userRole در Local Storage
    localStorage.setItem('userRole', role ? role.toString() : '');
  }

  get userRoles(): Observable<string> {
    return this.userRolesSubject.asObservable();
  }


  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  saveUsername(username: string) {
    localStorage.setItem('username', username);
  }
}
