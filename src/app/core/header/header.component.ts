import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {

  }
  public payload;
  constructor(public auth: AuthService, public sharedService: SharedService,private _route: Router) {
    this.payload = JSON.parse(sessionStorage.getItem('payload'));
    console.log(this.payload)
  }
  public items = [

    {
      label: 'Sign Out',
      icon: 'pi pi-sign-out',
      command: () => {
        this.auth.logOut();
      }
    },
    // {
    //   label: 'Delete',
    //   icon: 'pi pi-times',
    //   command: () => {

    //   }
    // }
  ];
  public getRecords() {
    this.sharedService.get('check-in').subscribe((res:any)=>{
      console.log(res);
    })
  }
}
