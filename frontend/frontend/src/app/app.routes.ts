import { Routes,RouterModule } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import { LoginComponent } from './login/login.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import {AddMachineComponent} from "./addmachine/addmachine.component";
import { HomePageComponent } from './home-page/home-page.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddExercisesComponent } from './add-exercises/add-exercises.component';
import { QrCodeScannerComponent } from './qr-code-scanner/qr-code-scanner.component';
import { QrCodeScannerEntranceComponent } from './qr-code-scanner-entrance/qr-code-scanner-entrance.component';
import { MachineStatusComponent} from './machine-status/machine-status.component';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { authGuard } from './auth.guard';
import { MembershipPlansComponent } from './membership-plans/membership-plans.component';
import { PaymentFailureComponent } from './payment-failure/payment-failure.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { AboutUsComponent } from './about-us/about-us.component';

export const routes: Routes = [
    { path: 'callback', component: CallbackComponent },
    { path: 'usermanagement', component: UsermanagementComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
    { path: 'machines', component: AddMachineComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
    {path: '', component: HomePageComponent},
    { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [authGuard], data: { roles: ['User'] } },
    { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
    { path: 'add-exercises', component: AddExercisesComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
    {path:'qr-code-scanner',component:QrCodeScannerComponent, canActivate: [authGuard], data: { roles: ['User'] }},
    {path:'qr-code-entrance',component:QrCodeScannerEntranceComponent, canActivate: [authGuard], data: { roles: ['Admin'] }},
    {path: "machine-status", component:MachineStatusComponent, canActivate: [authGuard], data: { roles: ['User'] }},
    {path: 'check-in', component: QrCodeComponent, canActivate: [authGuard], data: { roles: ['User'] }},
    {path: 'payment', component: MembershipPlansComponent, canActivate: [authGuard], data: { roles: ['User'] }},
    {path: 'payment-success',component:PaymentSuccessComponent, canActivate: [authGuard], data: { roles: ['User'] }},
    {path: 'payment-failure',component:PaymentFailureComponent, canActivate: [authGuard], data: { roles: ['User'] }},
    {path: 'about-us',component:AboutUsComponent}


];

