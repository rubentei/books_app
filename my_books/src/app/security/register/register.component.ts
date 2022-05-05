import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {
  }

  userRegister(registerForm: NgForm) {
    this.securityService.userRegister({
      email: registerForm.value.email,
      password: registerForm.value.password,
      lastname: registerForm.value.lastname,
      name: registerForm.value.name,
      username: registerForm.value.username,
      userId: '',
      token: ''
    })
  }

}
