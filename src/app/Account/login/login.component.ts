import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports:[ReactiveFormsModule, NgIf,NgFor,RouterModule,NgFor, DatePipe, NgIf,ReactiveFormsModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup<any>;
  isSubmitted = false;
  errorMessage: string | undefined ;

  constructor(private formBuilder: FormBuilder, private router: Router,private _elementRef : ElementRef) {
    
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return control ? control.invalid && (control.touched || this.isSubmitted) : false;
  }

  get formControls() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    if (email === 'ihebmoujahed@gmail.com' && password === 'ihebiheb') {
      localStorage.setItem('userToken', 'dummyToken');
      this.router.navigate(['/Dashboard']);
    } else {
      this.errorMessage = "Invalid credentials"
    }
  }
}
