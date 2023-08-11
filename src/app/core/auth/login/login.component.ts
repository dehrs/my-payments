import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from '../../models/login.model';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('formLogin') formLogin!: NgForm;
  login: Login = {};
  message = '';
  typePassword = 'password';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.loginService?.loggedUser) {
      this.router.navigate(['/home']);
    }

    this.route.queryParams.subscribe(params => {
      this.message = params['error'];
    });
  }

  logar(): void {
    if (this.formLogin.form.valid) {
      this.loginService.login(this.login).subscribe(usu => {
        if (usu != null) {
          this.loginService.loggedUser = usu;
          this.router.navigate(['/home']);
        } else {
          this.message = 'Usuario/Senha inválidos!';
        }
      });
    }
  }

  onShowPassword() {
    if (this.typePassword === 'password') {
      this.typePassword = 'text';
    } else {
      this.typePassword = 'password';
    }
  }
}
