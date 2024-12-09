import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedService } from 'src/app/services/shared.service';
declare var $:any;
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  public addBookForm: FormGroup;
  public department = [{ id: 1, name: "Computer Science" }, { id: 2, name: "Electrical Engineering" },{ id: 3, name: "Mechanical Engineering" }]
  constructor(private formBuilder: FormBuilder, private _auth: AuthService, private _route: Router, public shared: SharedService) {
    this.addBookForm = this.addBook();
  }
  public payload: Object;
  ngOnInit(): void {
    this.payload = JSON.parse(sessionStorage.getItem('payload'));
    console.log(this.payload['libraryname'])
  }
  addBook() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      author: ['', Validators.required],
      publisher: ['', Validators.required],
      department: [null, Validators.required],
      price: [null, Validators.required],
      quantity: [null, Validators.required],
      availability: ['', Validators.required],
      rent: [null, Validators.required],
      availableBooks:[null, Validators.required]
    });
  }
  public characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  public numbers = '0123456789'
  formSubmit() {
    console.table(this.addBookForm.value);
    const charactersLength = this.characters.length;
    const numberLength = this.numbers.length;
    let obj = {
      name: this.addBookForm.value.name,
      image: this.uploadedFiles,
      description: this.addBookForm.value.description,
      author: this.addBookForm.value.author,
      publisher: this.addBookForm.value.publisher,
      department: this.addBookForm.value.department,
      price: this.addBookForm.value.price,
      libraryname: this.payload['libraryname'],
      shelve:this.characters.charAt(Math.floor(Math.random() * charactersLength))+this.numbers.charAt(Math.floor(Math.random() * numberLength)),
      quantity:this.addBookForm.value.quantity
    }
    this.shared.post("add-book", obj).subscribe((res) => {
      console.log(res);
      this.addBookForm.reset();
    })
  }

  public fileBlob: any;
  public uploadedFiles: any;
  changeFile(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  onUpload(event: any) {
    console.log()
    if (event.target.value) {
      const file = event.target.files[0];
      const type = file.type;
      this.changeFile(file).then((base64: any) => {
        console.log(base64);
        this.uploadedFiles = base64;
      });
    } else alert('Nothing')
  }


}
