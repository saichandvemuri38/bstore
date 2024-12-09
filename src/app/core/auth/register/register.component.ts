import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerData: FormGroup;
  public roles: any = [{ id: 2, name: "Student" }]
  constructor(private formBuilder: FormBuilder, private _auth: AuthService, private _route: Router) {
    this.registerData = this.registerForm();
  }

  ngOnInit(): void {
  }
  registerForm() {
    return this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      confirmPassword:['',Validators.required],
      dob:['',Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required],
      usertype: ['', Validators.required]
    });
  }
  get registerValid() {
    return this.registerData.controls;
  }
  onSubmit() {
    if (this.registerData.valid) {
      let obj = {
        fname:this.registerData.value.fname,
        lname:this.registerData.value.lname,
        password:this.registerData.value.password,
        usertype:this.registerData.value.usertype,
        dob:this.registerData.value.dob.toISOString().slice(0, 10),
        email:this.registerData.value.email
      }
      this._auth.postUserdata(obj).subscribe(res => {
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
    // console.log(this.registerForm.value,"login details")
  }
}
