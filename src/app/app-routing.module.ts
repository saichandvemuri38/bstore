import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { UserDashboardComponent } from './core/user-dashboard/user-dashboard.component';
import { AuthGuard } from './services/auth.guard';
import { RoleGuard } from './services/role.guard';
import { AdminDashboardComponent } from './core/admin-dashboard/admin-dashboard.component';
import { SuperAdminDashboardComponent } from './core/super-admin-dashboard/super-admin-dashboard.component';
import { BooksListComponent } from './core/books-list/books-list.component';
import { BookUserRecordsComponent } from './core/book-user-records/book-user-records.component';
import { ReserveBookListComponent } from './core/reserve-book-list/reserve-book-list.component';
import { PaymentComponent } from './core/payment/payment.component';
import { ForgotPasswordComponent } from './core/auth/forgot-password/forgot-password.component';
import { ProfileComponent } from './core/profile/profile.component';
import { AdminLibraryBookListComponent } from './core/admin-dashboard/admin-library-book-list/admin-library-book-list.component';
import { FinesComponent } from './core/admin-dashboard/fines/fines.component';
import { PaginationComponent } from './core/pagination/pagination.component';
import { PaginationParentComponent } from './core/pagination/pagination-parent/pagination-parent.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'book-list', component: BooksListComponent },
  { path: 'records', component: BookUserRecordsComponent },
  { path: 'reserve-book', component: ReserveBookListComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'fines', component: FinesComponent },
  { path: 'admin-book-list', component: AdminLibraryBookListComponent ,canActivate: [AuthGuard, RoleGuard], data: { role: 'Admin' }},
  { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'Student' } },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'Admin' } },
  { path: 'super-admin-dashboard', component: SuperAdminDashboardComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'Super-Admin' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
