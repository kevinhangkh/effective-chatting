import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordValidators } from 'src/app/validators/password-validator';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  
  form: FormGroup;
  showPwd: boolean = false;
  agreed: boolean = false;
  errorMessage: string = '';
  
  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
    ) 
    { }
    
    ngOnInit(): void {
      this.initForm();
    }

    initForm(): void {

      this.form = this.fb.group({
        email: [null, Validators.compose([
          Validators.required,  
          Validators.email
        ])],
        password: [null, Validators.compose([
          Validators.required, 
          Validators.minLength(8),
          PasswordValidators.patternValidator(/\d/, { hasNumber: true }),
          PasswordValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          PasswordValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
          PasswordValidators.patternValidator(/[ !@#$%^&*()_+\-=[\]{};':"|,\.<>/?\\]/, { hasSpecialCharacters: true })
        ])],
        username: [null, Validators.compose([
          Validators.required
        ])]
      })

    }
    
    signUp(form: FormGroup): void {
      // console.log(form.value);
      const email = form.value.email;
      const username = form.value.username;
      const password = form.value.password;

      this.auth.signUp(email, username, password)
      .then(() => {
        // this.router.navigate(['/chat'])
      })
      .catch((err) => {
        const message = this.auth.getErrorMessage(err?.code);
        this.errorMessage = message ? message : err?.message;
        console.error(err);
        form.reset();
      }
      );
    }

    toggleShowPwd(): void {
      this.showPwd = !this.showPwd;
    }

    toggleAgree(): void {
      this.agreed = !this.agreed;
    }
    
    
  }
