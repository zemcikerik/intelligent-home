import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DeviceManagementComponent, HomeComponent, UserManagementComponent } from './components';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'devices', component: DeviceManagementComponent },
  { path: 'users', component: UserManagementComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
