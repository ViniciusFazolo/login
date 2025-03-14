import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, ElementRef, HostListener, inject, signal, ViewChild } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { environment } from '../../environments/environment';
import { Usuario } from '../../model/usuario';
import { Paginator } from '../../model/paginator';

@Component({
  selector: 'app-usuarios',
  imports: [],
  templateUrl: 'usuarios.component.html',
  styles: ``
})
export class UsuariosComponent {
  private _httpClient = inject(HttpClient)
  private _loginService = inject(LoginService)
  api: string = environment.apiUrl + "usuario"
  usuarios!: Paginator<Usuario>
  pagina = signal(0)
  itens = signal(10)
  isLoading: boolean = false
  
  ngOnInit(): void {
    this.getUsuarios()
  } 

  private getUsuarios(){
    const params = new HttpParams()
    .set('pagina', this.pagina().toString()) 
    .set('itens', this.itens().toString());

    this.isLoading = true
    this._httpClient.get<Paginator<Usuario>>(this.api, {headers: this._loginService.getAuthHeaders(), params: params}).subscribe({
      next: (res) => {
        this.usuarios = {
          ...res,
          content: this.usuarios != null ? [...this.usuarios.content, ...res.content] : res.content // Concatena novos usuários
        };

        this.isLoading = false
      },
      error: err => {
        this.isLoading = false
      },
    })
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    const offset = 200;
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - offset)) {
      if (!this.usuarios.last) {
        this.pagina.set(this.usuarios.number + 1);
        this.getUsuarios();
      }
    }
  }
}
