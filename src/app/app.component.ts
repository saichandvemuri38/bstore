import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpinnerService } from './services/auth/spinner.service';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';
interface NgxSpinnerConfig {
  type?: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'library-frontend';
  public spinnerCheck = false;
  public loginScreen = false;
  public payload;
  ngOnInit(): void {
    this.router.url.includes("login") ? this.loginScreen = true : this.loginScreen = false;
    this.spinnerInit();
  }
  constructor(public spinner:SpinnerService,private cdref: ChangeDetectorRef,public auth:AuthService,public router:Router){
    this.payload = this.auth.getPayload();
    // if(this.payload?.role == "Student"){
    //   this.router.navigateByUrl('/user-dashboard');
    // }
    // else if(this.payload?.role == "Admin"){
    //   this.router.navigateByUrl('admin-dashboard');
    // }
    //    if(this.payload){
    //   this.router.navigateByUrl('/user-dashboard');
    // }
  }
  spinnerInit() {
    this.spinner.getSpinnerObservable().subscribe((res) => {
      this.spinnerCheck = res === 'start';
      this.cdref.detectChanges();
    })
  }
}
