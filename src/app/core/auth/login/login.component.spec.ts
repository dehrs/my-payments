import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

const mockUser = {
  id: '1',
  login: 'teste1',
  passowrd: 'teste1',
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let injector: TestBed;
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [RouterTestingModule, FormsModule, MatIconModule],
      providers: [LoginService],
    }).compileComponents();
  });

  beforeEach(() => {
    injector = getTestBed();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = injector.inject(Router);
    service = injector.inject(LoginService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`if the user is logged in call the route '/home'`, () => {
    spyOn(router, 'navigate');

    service.loggedUser = mockUser;
    component.ngOnInit();

    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('login function test success', () => {
    component.login = {
      login: 'teste1',
      password: 'teste1',
    };
    spyOn(router, 'navigate');
    spyOn(service, 'login').and.returnValues(of(mockUser));

    component.logar();

    expect(service.loggedUser).toEqual(mockUser);
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('login function test error', () => {
    component.login = {
      login: 'teste1',
      password: 'abc',
    };

    spyOn(service, 'login').and.returnValues(of(null));

    component.logar();

    expect(component.message).toEqual('Usuario/Senha inválidos!');
  });

  it('onShowPassword function test', () => {
    expect(component.typePassword).toEqual('password');
    const button =
      fixture.debugElement.nativeElement.querySelector('.mat-icon');
    button.click();
    expect(component.typePassword).toEqual('text');
    button.click();
    expect(component.typePassword).toEqual('password');
  });
});
