import { Routes } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

export const routes: Routes = [
    { path: 'callback', component: CallbackComponent },
    {path: '', component: HomePageComponent},
    { path: 'user-dashboard', component: UserDashboardComponent },


];
