import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DeviceListComponent, DeviceManagementComponent, UserManagementComponent } from './components';

const routes: Routes = [
  { path: '', component: DeviceListComponent },
  { path: 'devices', component: DeviceManagementComponent },
  { path: 'users', component: UserManagementComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
