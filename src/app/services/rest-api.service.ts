import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { UserDetailModel, UserDetailOutput, UsersOutput } from '../models/UserDetailModel';



@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  baseUrl = environment.baseUrl;

  constructor(
    private httpService: HttpClient
    ) { }

    public AuthenticUser(userDetails: UserDetailModel): Observable<HttpResponse<UserDetailOutput>> {
      let headers = new HttpHeaders();
      return this.httpService.post<UserDetailOutput>(`${this.baseUrl}api/login`, userDetails, { observe: 'response', headers: headers }).pipe(catchError(this.handleError));
    }

    public GetUsers(): Observable<HttpResponse<UsersOutput>> {
      let headers = new HttpHeaders();
      if(localStorage.getItem('token')){
        headers = headers.set('authorization', `Bearer ${localStorage.getItem('token')}`);
      }
      return this.httpService.get<UsersOutput>(`${this.baseUrl}api/users`, { observe: 'response', headers: headers }).pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
      return throwError(error);
    }
}
