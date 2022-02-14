import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { RestApiService } from '../services/rest-api.service';
import { UsersOutput } from '../models/UserDetailModel';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  usersList: any = [];

  constructor(
    public restApi: RestApiService,
    private router: Router) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.restApi.GetUsers().subscribe((response: HttpResponse<UsersOutput>) => {
      this.usersList = response.body.data;
    }, (err: HttpErrorResponse) => {
    });
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
