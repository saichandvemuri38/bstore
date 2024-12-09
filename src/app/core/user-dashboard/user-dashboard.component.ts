import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  public library_view: boolean = true;
  public book_view: boolean = false;
  ngOnInit(): void {

  }
  constructor() { }
}
