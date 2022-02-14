import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { RestApiService } from '../services/rest-api.service';
import { UserDetailOutput } from '../models/UserDetailModel';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  emailPattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

  isSubmitted: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    public restApi: RestApiService,
    private router: Router,
    public auth: AuthService
  ) {

    if(this.auth.isAuthenticated){
      this.router.navigate(['/home']);
    }

    this.loginForm = this.formBuilder.group({
      email : new FormControl('',[Validators.required, Validators.pattern(this.emailPattern)]),
      password : new FormControl('',[Validators.required, Validators.minLength(8)])
    });

   }

  ngOnInit() {
  }

  submit(){
      this.isSubmitted = true;
      if(this.loginForm.valid){
          let userDetail = {
            email : this.loginForm.value.email,
            password : this.loginForm.value.password
          };

          this.restApi.AuthenticUser(userDetail).subscribe((response: HttpResponse<UserDetailOutput>) => {
            this.isSubmitted = false;
            localStorage.setItem('token',response.body.token);
            this.router.navigate(['/home']);
          }, (err: HttpErrorResponse) => {
            this.isSubmitted = false;
          });
      }
  }

}
