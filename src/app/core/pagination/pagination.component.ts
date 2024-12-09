import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
export interface paging {
  selectedPage?: any,
  productsPerPage?: any
}
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  public ArrayList = [];
  public productsPerPage: number = 4;
  public selectedPage = 1;
  public products
  public test = 1
  public paging: paging
  @Output() childEvent = new EventEmitter();

  constructor(public http: HttpClient) { }
  ngOnInit(): void {
    this.http.get('http://poc.aquilasoftware.com/poclite/common/getLookupsData?lookupNames=state').subscribe(res => {
      this.ArrayList = res['state']
      console.log(this.ArrayList.length)
      let pageIndex = (this.selectedPage - 1) * this.productsPerPage;
      this.products = this.ArrayList.slice(pageIndex, this.productsPerPage)
    })
    this.paging = { selectedPage: this.selectedPage, productsPerPage: this.productsPerPage }

  }
  changePageSize(event) {
    const selectElement = (event.target as HTMLSelectElement);
    const newSize = +selectElement.value
    this.productsPerPage = Number(newSize);
    this.changePageing(1);

  }


  get pageNumbers(): number[] {
    return Array(Math.ceil(this.ArrayList?.length / this.productsPerPage)).fill(0).map((x, i) => i + 1)
  }
  changePageing(test) {
    // const selectElement = (event.target as HTMLSelectElement)
    this.selectedPage = test
    this.test = this.selectedPage
    this.hjnmk()

  }
  changePage(event) {
    const selectElements = (event.target as HTMLSelectElement)
    this.selectedPage = +selectElements.value;
    console.log(selectElements)
    this.hjnmk()
  }
  // hjnmk() {
  //   let pageIndex = (this.selectedPage - 1) * this.productsPerPage;
  //   let endIndexes = (this.selectedPage - 1) * this.productsPerPage + this.productsPerPage;
  //   this.products = [];
  //   this.products = this.ArrayList.slice(pageIndex, endIndexes)
  // }
  prevPage(): void {
    this.selectedPage = this.selectedPage - 1;
    this.test = this.selectedPage
    this.hjnmk()
  }

  nextPage(): void {
    this.selectedPage = this.selectedPage + 1;
    this.test = this.selectedPage
    this.hjnmk()
  }
  hjnmk(){
    this.paging = { selectedPage: this.selectedPage, productsPerPage: this.productsPerPage }
    this.childEvent.emit(this.paging)
  }
}
