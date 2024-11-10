import { Routes,RouterModule } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import { LoginComponent } from './login/login.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import {AddMachineComponent} from "./addmachine/addmachine.component";
import { HomePageComponent } from './home-page/home-page.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
    { path: 'callback', component: CallbackComponent },
    { path: 'usermanagement', component: UsermanagementComponent },
    { path: 'machines', component: AddMachineComponent },    
    {path: '', component: HomePageComponent},
    { path: 'user-dashboard', component: UserDashboardComponent },
    { path: 'admin-dashboard', component: AdminDashboardComponent}

];

