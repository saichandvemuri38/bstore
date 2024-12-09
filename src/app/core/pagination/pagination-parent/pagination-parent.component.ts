import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination-parent',
  templateUrl: './pagination-parent.component.html',
  styleUrls: ['./pagination-parent.component.scss']
})
export class PaginationParentComponent implements OnInit {
  public ArrayList
  public productsPerPage: number = 4;
  public selectedPage = 1;
  constructor(public http: HttpClient) { }
  ngOnInit(): void {
    this.http.get('http://poc.aquilasoftware.com/poclite/common/getLookupsData?lookupNames=state').subscribe(res => {
      this.ArrayList = res['state']
      console.log(this.ArrayList.length)
      let pageIndex = (this.selectedPage - 1) * this.productsPerPage;
      this.products = this.ArrayList.slice(pageIndex, this.productsPerPage)
    })
  }
  receivedValues(event) {
    this.slicedProducts(event)
  }
  public products;
  slicedProducts(event) {
    let pageIndex = (event.selectedPage - 1) * event.productsPerPage;
    let endIndexes = (event.selectedPage - 1) * event.productsPerPage + event.productsPerPage;
    this.products = [];
    this.products = this.ArrayList.slice(pageIndex, endIndexes)
  }
}
