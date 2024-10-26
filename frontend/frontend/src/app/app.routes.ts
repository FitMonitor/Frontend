import { Routes,RouterModule } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import {HomeComponent} from "./home/home.component";
import { LoginComponent } from './login/login.component';
import {AddMachineComponent} from "./addmachine/addmachine.component";

export const routes: Routes = [
    { path: 'callback', component: CallbackComponent },
    //{path: '', component: LoginComponent},
    { path: 'machines', component: AddMachineComponent }
];

