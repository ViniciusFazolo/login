import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  template: `
    <div class="page">
        <form method="POST" class="formLogin" [formGroup]="formGroup" (ngSubmit)="login()">
            <h1>Login</h1>
            <p>Digite os seus dados de acesso no campo abaixo.</p>
            <label for="email">E-mail</label>
            <input formControlName="email" type="email" placeholder="Digite seu e-mail" autofocus="true" />
            <label for="password">Senha</label>
            <input formControlName="password" type="password" placeholder="Digite seu e-mail" />
            <a href="/">Esqueci minha senha</a>
            <input type="submit" value="Acessar" class="btn" />
        </form>
    </div>
  `,
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
formGroup: FormGroup

  constructor(private _loginService: LoginService, private _router: Router, private _toastrService: ToastrService){
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    if(this._loginService.getName){
      this._loginService.verifyUserType()
    }
  }

  login(): any{
    if(!this.formGroup.valid) return this._toastrService.warning("Preencha todos os campos", "Aviso")

    this._loginService.login(this.formGroup.value)
  }
}
