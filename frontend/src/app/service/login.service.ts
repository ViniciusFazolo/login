import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginCredentials } from '../model/login-credentials';
import { RegisterCredentials } from '../model/register-credentials';
import { LoginResponse } from '../model/login-response';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  apiPath: string = environment.apiUrl + "auth";

  constructor(private httpClient: HttpClient, private _router: Router, private _toastrService: ToastrService) {}

  login(data: LoginCredentials) {
    return this.httpClient.post<LoginResponse>(`${this.apiPath}/login`, data).subscribe({
      next: res => {
        this._toastrService.success("Login bem sucedido", "Sucesso")
        this.setUser(res)
      },
      error: err => {
        this._toastrService.error(err.message, 'Erro');
      },
      complete: () => {
        this.verifyUserType()
      }
    })
  }

  register(data: RegisterCredentials) {
    this.httpClient.post(`${this.apiPath}/register`, data).subscribe({
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
    localStorage.removeItem('role');
  }

  verifyUserType(){
    if(this.getRole == "ADMIN"){
      this._router.navigate(['usuario'])
    }else{
      this._router.navigate(['home'])
    }
  }

  redirectToLogin(){
    return this._router.navigate([''])
  }

  isTokenValid(token: string){
    return this.httpClient.get<boolean>(`${this.apiPath}/validate/${token}`)
  }

  setUser(data: LoginResponse) {
    localStorage.setItem('name', data.name);
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);
  }

  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + this.getToken,
    });
  }

  get getToken(){
    return localStorage.getItem('token') || null
  }

  get getName(){
    return localStorage.getItem('name') || null
  }

  get getRole(){
    return localStorage.getItem('role') || null
  }
}
