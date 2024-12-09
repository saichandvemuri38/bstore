import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-fines',
  templateUrl: './fines.component.html',
  styleUrls: ['./fines.component.scss']
})
export class FinesComponent implements OnInit {
  public payload;
  public fineList;
  constructor(public sharedService: SharedService, public auth: AuthService) { }
  ngOnInit(): void {
    this.payload = this.auth.getPayload();
    console.log(this.payload)
    this.getRecords();
  }
  getRecords() {
    this.sharedService.get("fine-list?libraryname="+this.payload.libraryname).subscribe(res => {
      this.fineList = res;
    })
  }
}
