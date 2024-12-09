import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedService } from 'src/app/services/shared.service';
interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.scss']
})
export class SuperAdminDashboardComponent implements OnInit {
  [x: string]: any;

  uploadedFiles: any[] = [];

  public registerData: FormGroup;
  public addLibraryForm: FormGroup;
  public roles: any = [{ id: 1, name: "Admin" }];
  public libraryList: any;
  constructor(private formBuilder: FormBuilder, private _auth: AuthService, private _route: Router, public shared: SharedService) {
    this.registerData = this.registerForm();
    this.addLibraryForm = this.addLibrary();
  }
  ngOnInit(): void {
    this.getLibraryList();
  }
  public getLibraryList() {
    this.shared.get("library-list").subscribe((res) => {
      this.libraryList = res;
    })
  }
  addLibrary() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      street: ['', [Validators.required]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip4: ['', Validators.required]
    });
  }
  registerForm() {
    return this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      usertype: ['', Validators.required],
      library_name: [null, Validators.required],
      dob:['2024-03-03', Validators.required]
    });
  }
  get registerValid() {
    return this.registerData.controls;
  }
  onSubmit() {
    this._auth.postUserdata(this.registerData.value).subscribe(res => {
      console.log(res);
      this.registerData.reset();
    },
      (error: any) => {
        console.log(error)
      })



  }

  // onUpload(event: UploadEvent) {
  //   for (let file of event.files) {
  //     console.log(file)
  //     this.uploadedFiles.push(file);
  //   }
  //   console.log(this.uploadedFiles)
  // }

  public fileBlob: any;

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
        // const blob = new Blob([base64] ,{type: 'image/png'});
        // this.fileBlob = this.b64Blob([base64], type);
        // console.log(blob)
      });
    } else alert('Nothing')
  }


  onAddLibrarySubmit() {

    let obj = {
      name: this.addLibraryForm.value.name,
      image: this.uploadedFiles,
      street: this.addLibraryForm.value.street,
      city: this.addLibraryForm.value.city,
      state: this.addLibraryForm.value.state,
      zip4: this.addLibraryForm.value.zip4
    }
    this.shared.addLibrary(obj).subscribe(res => {
      console.log(res);
      this.addLibraryForm.reset();
      this.getLibraryList();
    })
  }
}
