import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public loginform: FormGroup;

  constructor(private formBuilder: FormBuilder, private _auth: AuthService, private _route: Router, public sharedservice: SharedService) {
    this.loginform = this.loginForm();
  }

  ngOnInit(): void {

  }
  loginForm() {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required]],
    });
  }
  get loginValid() {
    return this.loginform.controls;
  }
  public changePassword = false;
  onSubmit() {
    this.sharedservice.post('forgot-password', this.loginform.value).subscribe(res => {
      console.log(res);
      if (res == true) {
        this.changePassword = true;
      }
      if(res.changed == true){
        this._route.navigateByUrl('/login')
      }
    },
      (error: any) => {
        console.log(error)
      })
  }
}
