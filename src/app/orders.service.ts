import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { Order } from './order.interface'

@Injectable({providedIn: 'root'})
export class OrdersService {
  orderUrl = 'https://coveredindogshair.com/orders';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('OrdersService');
  }

  getOrders() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.get(this.orderUrl, httpOptions)
    .pipe(
      catchError(this.handleError('getOrders', []))
    );
  }

  createOrder(order: Order, token: string) {

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.post(this.orderUrl, order, httpOptions)
    .pipe(
      catchError(this.handleError('createOrder', []))
    );
  }

  deleteOrder(id: string, token: string) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`
      }),
      body: {
        id: id
      }
    };

    return this.http.delete(this.orderUrl, httpOptions)
    .pipe(
      catchError(this.handleError('deleteOrder', []))
    );
  }
}