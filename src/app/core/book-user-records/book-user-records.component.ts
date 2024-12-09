import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-book-user-records',
  templateUrl: './book-user-records.component.html',
  styleUrls: ['./book-user-records.component.scss']
})
export class BookUserRecordsComponent implements OnInit {
  public payload: any;
  public checkInList;
  public rangeDates;
  public minDate = new Date();
  public checkoutBook = false;
  public payment = false;
  public cardType= [{id:1,name:'Credit Card'},{id:2,name:'Debit Card'}]
  public items: MenuItem[] | undefined = [{ label: "Renewal Book" }]
  constructor(public sharedService: SharedService, public authService: AuthService) { }
  ngOnInit(): void {
    this.payload = this.authService.getPayload();
    this.getRecords();
  }
  public getRecords() {
    console.log(this.payload)
    this.sharedService.get('check-in?userId=' + this.payload.subject).subscribe((res: any) => {
      console.log(res);
      this.checkInList = res;
      this.checkInList.map(x => {
        console.log(new Date(x.endDate) < new Date() && x.fine);
        (new Date(x.endDate) < new Date()) && ( x.status == "paid") ? x.renewal = true : x = x;
      })
    })
  }
  public visible = false;
  public bookId;
  public showDialog(item) {
    this.bookId = item.bookId
    this.visible = true;
  }
  public close() {
    this.visible = false;
    this.rangeDates = "";
    this.checkoutBook = false;
    this.selectedProduct = "";
    this.checkOutLibName = "";
  }
  public renewalDate() {
    let obj = {
      startDate: this.rangeDates[0].toLocaleString('en-US'),
      endDate: this.rangeDates[1].toLocaleString('en-US'),
      bookId: this.bookId
    }
    this.sharedService.post('renewal-book', obj).subscribe(res => {
      this.getRecords();
    })
    this.rangeDates = "";
    this.visible = false;
  }
  public paymentRecords;
  public payFine(product) {
    this.payment = true;
   this.paymentRecords = product;
   this.paymentRecords.userName = this.payload.name;
   console.log(this.paymentRecords)
  }
  public checkOutLibName;
  public libraryList;
  public selectedProduct;
  public showCheckOutDialog(product) {
    this.checkoutBook = true;
    this.selectedProduct = product;
    this.selectedProduct.userName = this.payload.name;
    this.sharedService.get('library-list').subscribe(res => {
      this.libraryList = res;
    })
  }
  public submitCheckout(item) {
    console.log(item, this.selectedProduct);
    let obj = {
      id:this.selectedProduct.id,
      name: this.selectedProduct.name,
      description: this.selectedProduct.description,
      author: this.selectedProduct.author,
      publisher: this.selectedProduct.publisher,
      department: this.selectedProduct.department,
      price: this.selectedProduct.price,
      quantity:this.selectedProduct.quantity,
      libraryname: item.name,
      bookId: this.selectedProduct.bookId
    }
    this.sharedService.post('check-out', obj).subscribe(res => {
      console.log(res)
      this.getRecords();
      this.close()
    })
  }
  public paymentSuccess(){
    this.payment = false;
    this.sharedService.post('pay-fine', this.paymentRecords).subscribe(res => {
      console.log(res);
      this.getRecords();
    })
  }
}
