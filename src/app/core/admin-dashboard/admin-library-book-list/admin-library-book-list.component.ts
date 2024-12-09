import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-admin-library-book-list',
  templateUrl: './admin-library-book-list.component.html',
  styleUrls: ['./admin-library-book-list.component.scss']
})
export class AdminLibraryBookListComponent implements OnInit {
  public payload;
  public bookList;
  constructor(public sharedService: SharedService, public auth: AuthService) { }
  ngOnInit(): void {
    this.payload = this.auth.getPayload();
    console.log(this.payload)
    this.getRecords();
  }
  getRecords() {
    this.sharedService.get("book-list?libraryname="+this.payload.libraryname).subscribe(res => {
      this.bookList = res;
    })
  }
}
