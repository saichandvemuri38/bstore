import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginform: FormGroup;
  constructor(private formBuilder: FormBuilder, private _auth: AuthService, private _route: Router) {
    this.loginform = this.loginForm();
  }

  ngOnInit(): void {
    sessionStorage.removeItem('payload');
    sessionStorage.removeItem('token');
  }
  loginForm() {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required]
    });
  }
  get loginValid() {
    return this.loginform.controls;
  }
  onSubmit() {
    if (this.loginform.valid) {
      this._auth.postLogin(this.loginform.value).subscribe(res => {
        console.log(res);
        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('payload', JSON.stringify(res.payload));
        if (res.payload.role == "Student" || res.payload.role == "Teacher") {
          this._route.navigate(['/user-dashboard'])
        }
        else if (res.payload.role == "Admin") {
          this._route.navigate(['/admin-dashboard'])
        }
        else if (res.payload.role == "Super-Admin") {
          this._route.navigate(['/super-admin-dashboard'])
        }

      },
        (error: any) => {
          console.log(error)
        })
    }
  }
}
