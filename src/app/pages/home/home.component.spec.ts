import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { FormsModule } from '@angular/forms';
import { LoginService } from 'src/app/core/services/login.service';
import { PaymentService } from 'src/app/core/services/payments.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const mockPayments = [
  {
    id: '9021f5f9-68e2-4768-a8ba-aa6543e27fc5',
    username: 'Teste1',
    title: 22,
    date: new Date('2023-04-30'),
    valuePayment: 100,
    isPaid: false,
  },
  {
    id: '4286d0cf-6e79-426c-833d-a944764a72f6',
    username: 'Teste2',
    title: 151,
    date: new Date('2023-08-09'),
    valuePayment: 300,
    isPaid: false,
  },
];

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let loginService: LoginService;
  let paymentsService: PaymentService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        SharedModule,
        HttpClientTestingModule,
        AppMaterialModule,
        FormsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService);
    paymentsService = TestBed.inject(PaymentService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onInit', () => {
    spyOn(paymentsService, 'getPayments').and.returnValues(of(mockPayments));
    component.ngOnInit();

    expect(paymentsService.getPayments).toHaveBeenCalled();
    expect(component.payments).toEqual(mockPayments);
    expect(component.paymentsFiltered).toEqual(mockPayments.slice(0, 3));
    expect(component.pageLength).toEqual(mockPayments.length);
  });

  it('logout', () => {
    spyOn(loginService, 'logout');
    spyOn(router, 'navigate');

    component.logout();

    expect(loginService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('onFindPayment', () => {
    component.payments = mockPayments;
    expect(component.onFindPayment(mockPayments[0])).toEqual(0);
  });

  it('onDelete', () => {
    component.payments = mockPayments;
    component.searchFilter = 'Teste';

    component.onDelete(mockPayments[0]);

    expect(component.pageLength).toEqual(component.paymentsFiltered.length);
    expect(component.pageSize).toEqual(component.paymentsFiltered.length);

    component.searchFilter = '';
    component.onDelete(mockPayments[0]);

    expect(component.paymentsFiltered).toEqual(component.payments.slice(0, 3));
  });

  it('handlePageEvent', () => {
    const mockPagination = {
      length: 0,
      pageIndex: 1,
      pageSize: 3,
      previousPageIndex: 0,
    };
    component.handlePageEvent(mockPagination);

    expect(component.paymentsFiltered).toEqual(component.payments);
  });

  it('applyFilter', () => {
    component.applyFilter('Test1');
    expect(component.paymentsFiltered).toEqual([]);

    component.payments = mockPayments;
    component.applyFilter('Teste1');
    expect(component.paymentsFiltered).toEqual([mockPayments[0]]);
  });

  it('onChangePaid', () => {
    component.onChangePaid(mockPayments[0], true);
    expect(component.paymentsFiltered).toEqual([]);

    component.payments = mockPayments;
    component.onChangePaid(mockPayments[0], false);
    expect(component.paymentsFiltered).toEqual(mockPayments);
  });

  it('filterEarliestDate', () => {
    component.payments = mockPayments;
    const date = component.payments.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    component.filterEarliestDate();

    expect(component.paymentsFiltered).toEqual(date);
  });

  it('filterMostRecent', () => {
    component.payments = mockPayments;
    const date = component.payments.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    component.filterMostRecent();

    expect(component.paymentsFiltered).toEqual(date);
  });
});
