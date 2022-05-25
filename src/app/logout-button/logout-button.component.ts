import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.css']
})
export class LogoutButtonComponent implements OnInit {
  ngOnInit(): void {}

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('identity');
    location.href = '/login';
  }
}