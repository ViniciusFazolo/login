import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginCredentials } from '../model/login-credentials';
import { RegisterCredentials } from '../model/register-credentials';
import { LoginResponse } from '../model/login-response';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  apiPath: string = 'http://localhost:8080/auth/';

  constructor(private httpClient: HttpClient, private _router: Router, private _toastrService: ToastrService) {}

  login(data: LoginCredentials) {
    return this.httpClient.post<LoginResponse>(`${this.apiPath}login`, data).subscribe({
      next: res => {
        this._toastrService.success("Login bem sucedido", "Sucesso")
        this.setUser(res)
      },
      error: err => {
        this._toastrService.error(err.error.message, 'Erro');
      },
      complete: () => {
        this.verifyUserType()
      }
    })
  }

  register(data: RegisterCredentials) {
    this.httpClient.post(`${this.apiPath}register`, data).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  logout() {
    localStorage.removeItem('name');
    localStorage.removeItem('token');
  }

  verifyUserType(){
    if(this.getName == 'vinicius'){
      this._router.navigate(['usuario'])
    }else{
      this._router.navigate(['home'])
    }
  }

  redirectToLogin(){
    return this._router.navigate([''])
  }

  isTokenValid(token: string){
    return this.httpClient.get<boolean>(`${this.apiPath}validate/${token}`)
  }

  setUser(data: LoginResponse) {
    localStorage.setItem('name', data.name);
    localStorage.setItem('token', data.token);
  }

  get getToken(){
    return localStorage.getItem('token') || null
  }

  get getName(){
    return localStorage.getItem('name') || null
  }
}
