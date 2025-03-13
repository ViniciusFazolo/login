import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-usuarios',
  imports: [],
  template: `<h1>Página de Usuários</h1>`,
  styles: ``
})
export class UsuariosComponent {
  private _httpClient = inject(HttpClient)
  private _loginService = inject(LoginService)
  api: string = environment.apiUrl + "usuario"
  
  ngOnInit(): void {
    this._httpClient.get(this.api, {headers: this._loginService.getAuthHeaders()}).subscribe({
      next: res => {
        console.log(res)
      },
      error: err => {
        console.log(err)
      }
    })
  } 
}
