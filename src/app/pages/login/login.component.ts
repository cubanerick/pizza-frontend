import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Credentials } from 'src/app/credentials';
import jwtDecode from 'jwt-decode';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  constructor(
    private auth: AuthService
  ) {}

  credentialsGroup!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  login(): void {
    const newCredentials: Credentials = {
      username: this.credentialsGroup.value.usernameControl,
      password: this.credentialsGroup.value.passwordControl
    };
    this.auth.getAuthToken(newCredentials)
    .subscribe(token => {
      let json = JSON.parse(JSON.stringify(token));
      let access_token = json.access_token;
      var decoded = JSON.parse(JSON.stringify(jwtDecode(access_token)));
      
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('identity', decoded.identity);
      location.href = '/shop';
    });
  }

  private initForm() {
    this.credentialsGroup = new FormGroup({
      passwordControl: new FormControl(''),
      usernameControl: new FormControl('')
    });
  }
}