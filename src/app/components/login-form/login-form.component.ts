import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { 

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, Validators.compose([
        Validators.required,  
        Validators.email
      ])],
      password: [null, Validators.compose([
        Validators.required, 
        // Validators.minLength(8),
        // PasswordValidators.patternValidator(/\d/, { hasNumber: true }),
        // PasswordValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // PasswordValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        // PasswordValidators.patternValidator(/[ !@#$%^&*()_+\-=[\]{};':"|,\.<>/?\\]/, { hasSpecialCharacters: true })
      ])]
    })
  }

  logIn(form: FormGroup) {
    const email = form.value.email;
    const password = form.value.password;
    this.auth.logIn(email, password)
    .then(res => this.router.navigate(['/chat']))
    .catch(err => console.error(err))
  }

}
