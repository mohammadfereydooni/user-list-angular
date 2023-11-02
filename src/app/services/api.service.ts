import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  saveUser(data : any){
    return this.http.post<any>("http://localhost:3000/userList/" , data)
  }

  getUsers(){
    return this.http.get<any>("http://localhost:3000/userList/")
  }

  putUser(data : any , id:number ){
    return this.http.put<any>("http://localhost:3000/userList/" +id ,data)
  }

  deleteUser(id:number){
    return this.http.delete<any>("http://localhost:3000/userList/"+id )
  }

  updateUser(data:any,id:number){
    return this.http.patch("http://localhost:3000/userList/"+id,data)
  }

}
