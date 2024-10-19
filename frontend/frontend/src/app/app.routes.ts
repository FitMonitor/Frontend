import {RouterModule, Routes} from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import {AddMachineComponent} from "./addmachine/addmachine.component";

export const routes: Routes = [
    { path: 'callback', component: CallbackComponent },
    { path: 'machines', component: AddMachineComponent }
];

