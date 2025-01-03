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
import { MembershipPlansComponent } from './membership-plans/membership-plans.component';
import { PaymentFailureComponent } from './payment-failure/payment-failure.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';

export const routes: Routes = [
    { path: 'callback', component: CallbackComponent },
    { path: 'usermanagement', component: UsermanagementComponent },
    { path: 'machines', component: AddMachineComponent },    
    {path: '', component: HomePageComponent},
    { path: 'user-dashboard', component: UserDashboardComponent },
    { path: 'admin-dashboard', component: AdminDashboardComponent},
    { path: 'add-exercises', component: AddExercisesComponent},
    {path:'qr-code-scanner',component:QrCodeScannerComponent},
    {path:'qr-code-entrance',component:QrCodeScannerEntranceComponent},
    {path: "machine-status", component:MachineStatusComponent},
    {path: 'check-in', component: QrCodeComponent},
    {path: 'payment', component: MembershipPlansComponent},
    {path: 'payment-success',component:PaymentSuccessComponent},
    {path: 'payment-failure',component:PaymentFailureComponent}


];

