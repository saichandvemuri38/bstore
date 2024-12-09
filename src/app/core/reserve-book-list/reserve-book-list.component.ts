import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-reserve-book-list',
  templateUrl: './reserve-book-list.component.html',
  styleUrls: ['./reserve-book-list.component.scss']
})
export class ReserveBookListComponent implements OnInit {
  public payload;
  public bookList;
  constructor(public sharedService: SharedService, public authService: AuthService) { }

  ngOnInit(): void {
    this.payload = this.authService.getPayload();
    this.getRecords();
  }
  getRecords() {
    this.sharedService.get('reserve-book?userId=' + this.payload.subject).subscribe(res => {
      this.bookList = res;
    })
  }
  checkIn(item) {
    console.log(item)
    let date = new Date();
    date.setDate(date.getDate() + 30);

    let obj = {
      bookId: item.bookId,
      name: item.name,
      image: item.image,
      author: item.author,
      publisher: item.publisher,
      department: item.department,
      price: item.price,
      quantity: item.quantity,
      availability: item.availability,
      rent: item.rent,
      libraryname: item.libraryname,
      userId: this.payload.subject,
      status: "on-hand",
      startDate: (new Date()).toLocaleString('en-US'),
      endDate: date.toLocaleString('en-US')
    }
    this.paymentRecords = obj
    this.payment = true;
  }
  deleteItem(product) {
    let obj = {
      name: product.name,
      image: product.image,
      description: product.description,
      author: product.author,
      publisher: product.publisher,
      department: product.department,
      price: product.price,
      libraryname: product.libraryname
    }
    this.sharedService.delete('delete-reserve-book?id=' + `${product._id}`, obj).subscribe((res) => {
      console.log(res);
      this.getRecords();
    })
  }
  public payment = false;
  public paymentRecords;
  public cardType = [{ id: 1, name: 'Credit Card' }, { id: 2, name: 'Debit Card' }]
  public paymentSuccess() {
    this.payment = false;
    this.sharedService.post('check-in', this.paymentRecords).subscribe((res) => {
      console.log(res);
      this.getRecords();
    })
  }
}
