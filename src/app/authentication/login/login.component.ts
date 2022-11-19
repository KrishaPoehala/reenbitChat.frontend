import { HttpService } from './../../../Services/HttpService';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder, private http: HttpService) { }

  loginForm = this.fb.group({
    email: [''],
    password: [''],
  })

  ngOnInit(): void {
  }
}
