import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/usuario.model';
import { Login } from '../models/login.model';

const LS_KEY = 'loggedUser';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public get loggedUser(): User {
    const usu = localStorage[LS_KEY];
    return usu ? JSON.parse(localStorage[LS_KEY]) : null;
  }

  public set loggedUser(user: User) {
    localStorage[LS_KEY] = JSON.stringify(user);
  }

  logout() {
    delete localStorage[LS_KEY];
  }

  login(login: Login): Observable<User | null> {
    const usu = {
      id: '1',
      login: login.login,
      passowrd: login.password,
    };

    if (login.login === login.password) {
      return of(usu);
    } else {
      return of(null);
    }
  }
}
