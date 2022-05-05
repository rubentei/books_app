import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private securityService:SecurityService) { }

  ngOnInit(): void {
  }

  userLogin(loginForm: NgForm) {
    this.securityService.login({
      email: loginForm.value.email,
      password: loginForm.value.password
    });
  }

}
