import { Routes } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import {HomeComponent} from "./home/home.component";
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: 'callback', component: CallbackComponent },
    //{path: '', component: LoginComponent}

];
