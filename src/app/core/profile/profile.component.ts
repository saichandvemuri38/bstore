import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public payload;
  public profileDetails;
  constructor(public sharedService: SharedService) { }
  ngOnInit(): void {
    this.payload = JSON.parse(sessionStorage.getItem('payload'));
    this.sharedService.get('user-records?id='+this.payload.subject).subscribe(res => {
      console.log(res);
      this.profileDetails = res;
    })
  }
}
