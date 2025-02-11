import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { response } from 'express';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private servic: AuthService,
    private fb: FormBuilder,
    private router:Router
    ){}
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm =this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.servic.login(this.loginForm.value).subscribe(
      (response)=>{
        console.log(response);
        if(response.bearer != null){
          // alert("Bonjour, votre token est " + response.bearer);
          const jwtToken =response.bearer;
          localStorage.setItem('jwt', jwtToken);
          this.router.navigateByUrl("/dashboard")
        }
      }
        
    )
  }
}
