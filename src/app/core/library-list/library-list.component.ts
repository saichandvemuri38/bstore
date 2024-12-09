import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-library-list',
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.scss']
})
export class LibraryListComponent implements OnInit {
public libraryList:any = [];
  constructor(public sharedService: SharedService,private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.sharedService.get("library-list").subscribe(res => {
  this.libraryList = res;
    })
  }
}
