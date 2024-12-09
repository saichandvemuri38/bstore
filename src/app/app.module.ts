import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { PrimengModule } from './modules/primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserDashboardComponent } from './core/user-dashboard/user-dashboard.component';
import { InterceptService, LoaderService } from './services/auth/intercept.service';
import { SpinnerService } from './services/auth/spinner.service';
import { HeaderComponent } from './core/header/header.component';
import { BooksListComponent } from './core/books-list/books-list.component';


import { AuthGuard } from './services/auth.guard';
import { RoleGuard } from './services/role.guard';
import { AdminDashboardComponent } from './core/admin-dashboard/admin-dashboard.component';
import { SuperAdminDashboardComponent } from './core/super-admin-dashboard/super-admin-dashboard.component';
import { SharedService } from './services/shared.service';
import { LibraryListComponent } from './core/library-list/library-list.component';
import { BookUserRecordsComponent } from './core/book-user-records/book-user-records.component';
import { ReserveBookListComponent } from './core/reserve-book-list/reserve-book-list.component';
import { PaymentComponent } from './core/payment/payment.component';
import { ForgotPasswordComponent } from './core/auth/forgot-password/forgot-password.component';
import { ProfileComponent } from './core/profile/profile.component';
import { AdminLibraryBookListComponent } from './core/admin-dashboard/admin-library-book-list/admin-library-book-list.component';
import { FinesComponent } from './core/admin-dashboard/fines/fines.component';
import { PaginationComponent } from './core/pagination/pagination.component';
import { PaginationParentComponent } from './core/pagination/pagination-parent/pagination-parent.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserDashboardComponent,
    HeaderComponent,
    BooksListComponent,
    AdminDashboardComponent,
    SuperAdminDashboardComponent,
    LibraryListComponent,
    BookUserRecordsComponent,
    ReserveBookListComponent,
    PaymentComponent,
    ForgotPasswordComponent,
    ProfileComponent,
    AdminLibraryBookListComponent,
    FinesComponent,
    PaginationComponent,
    PaginationParentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthService, SpinnerService, AuthGuard, RoleGuard, SharedService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
