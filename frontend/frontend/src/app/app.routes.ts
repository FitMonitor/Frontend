import {RouterModule, Routes} from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import {AddMachineComponent} from "./addmachine/addmachine.component";
import {HomeComponent} from "./home/home.component";
import { LoginComponent } from './login/login.component';


export const routes: Routes = [
    { path: 'callback', component: CallbackComponent },
    { path: 'machines', component: AddMachineComponent },
    { path: 'callback', component: CallbackComponent },
    //{path: '', component: LoginComponent}

];

