import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, output } from '@angular/core';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-home',
  imports: [],
  template: `
  <h1>Home</h1>
    <!-- <button (click)="getUsers()">LISTAR USUÀRIOS</button> -->
  `
})
export class HomeComponent {
  constructor(private http: HttpClient, private _loginService: LoginService){}

  
  getUsers(){
    const headers =  new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    })
 
    this.http.get('http://localhost:8080/usuario', {headers: headers}).subscribe({
      next: res => {
        console.log(res)
      },
      error: err => {
        console.log(err)
        if(err.status == 403){
          this._loginService.logout()
          this._loginService.redirectToLogin()
        }
      }
    })
  }
}
