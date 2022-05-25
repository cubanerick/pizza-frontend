import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { Credentials } from './credentials';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
};

@Injectable({providedIn: 'root'})
export class AuthService {
  authUrl = 'https://coveredindogshair.com/auth';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('AuthService');
  }

  getAuthToken(credentials: Credentials) {
    return this.http.post(this.authUrl, credentials, httpOptions)
    .pipe(
      catchError(this.handleError('getAuthToken', []))
    );
  }

}