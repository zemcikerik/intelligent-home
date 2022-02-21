import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DeviceListComponent, DeviceManagementComponent, UserManagementComponent } from './components';
import { AdminGuard } from './guards';

const routes: Routes = [
  { path: '', component: DeviceListComponent },
  { path: 'devices', component: DeviceManagementComponent, canActivate: [AdminGuard] },
  { path: 'users', component: UserManagementComponent, canActivate: [AdminGuard] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
