import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegisterPaymentComponent } from './modal-register-payment.component';
import { DialogModule, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { FormsModule } from '@angular/forms';

const mockDialogRef = {
  close: jasmine.createSpy('close'),
};

describe('ModalRegisterPaymentComponent', () => {
  let component: ModalRegisterPaymentComponent;
  let fixture: ComponentFixture<ModalRegisterPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalRegisterPaymentComponent],
      imports: [DialogModule, FormsModule],
      providers: [
        {
          provide: DialogRef,
          useValue: mockDialogRef,
        },
        {
          provide: DIALOG_DATA,
          useValue: {},
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRegisterPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test function onClose', () => {
    const button = fixture.debugElement.nativeElement.querySelector('#onClose');
    button.click();

    expect(component.registerPayment.id).toBeDefined();
    expect(component['dialogRef'].close).toHaveBeenCalled();
  });

  it('test function onCancel', () => {
    const button =
      fixture.debugElement.nativeElement.querySelector('#onCancel');

    button.click();

    expect(component['dialogRef'].close).toHaveBeenCalled();
  });
});
