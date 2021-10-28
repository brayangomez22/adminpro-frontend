import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public registerForm!: FormGroup;
  public formSubmitted = false;

  constructor(private fb: FormBuilder) {
    this.createReactiveForm();
  }

  private createReactiveForm(): void {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        password2: ['', Validators.required],
        terms: [false, Validators.required],
      },
      {
        validators: samePasswords,
      }
    );
  }

  public createUser(): void {
    this.formSubmitted = true;
    console.log(this.registerForm);

    if (this.registerForm.valid) {
      console.log('pepe');
    } else {
      console.log('pepe2');
    }
  }

  public invalidField(field: string): boolean {
    if (this.registerForm.get(field)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  public invalidPasswords(): boolean {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  public acceptTerms(): boolean {
    return !this.registerForm.get('terms')?.value && this.formSubmitted;
  }
}

export const samePasswords: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const pass1Control = control.get('password');
  const pass2Control = control.get('password2');

  if (
    (pass1Control != null || pass2Control) &&
    pass1Control?.value !== pass2Control?.value
  ) {
    pass2Control?.setErrors({
      samePasswords: false,
      msg: 'Passwords are not the same',
    });
  }

  return (pass1Control != null || pass2Control) &&
    pass1Control?.value !== pass2Control?.value
    ? {
        samePasswords: 'is not correct',
        msg: 'Check password validation',
      }
    : null;
};
