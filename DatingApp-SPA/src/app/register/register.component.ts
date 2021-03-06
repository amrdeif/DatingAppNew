import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { User } from '../_models/User';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};

  @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();

  // Reactive Form
  registerForm: FormGroup;

  // bsConfig
  bsConfig: Partial<BsDatepickerConfig>;

  user: User;

  constructor(private authService: AuthService, private alertify: AlertifyService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    // Create a register form by using FormGroup
    // this.registerForm = new FormGroup({
    //  username: new FormControl('', Validators.required),
    //  password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]),
    //  confirmPassword: new FormControl('', Validators.required)
    // }, this.passwordMatchValidator);

    // Create a register form by using FormBuilder
    this.bsConfig = {
      containerClass: 'theme-red'
    };
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { 'mismatch': true };
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
    }

    this.authService.register(this.user).subscribe(() => {
      this.alertify.success('Registration successful');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.authService.login(this.user).subscribe(() => {
        this.router.navigate(['/members']);
      });
    });
    // console.log(this.registerForm.value);
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
