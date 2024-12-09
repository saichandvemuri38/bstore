import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
  }
  showLoading(event, button) {
    event.preventDefault(); // Prevent form submission
    button.innerHTML = "Processing Payment...";
    setTimeout(function () {
      button.innerHTML = "Payment completed.";
    }, 3000); // Change to the desired duration in milliseconds
  }
}
