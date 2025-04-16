import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ManagerComponent } from './components/manager/manager.component';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SettingsComponent } from './components/settings/settings.component';
import { StaffComponent } from './components/staff/staff.component';
import { MachinesComponent } from './components/machines/machines.component';
import { DsrReadingComponent } from './components/dsr-reading/dsr-reading.component';
import { CalculationsComponent } from './components/calculations/calculations.component';
import { AttendenceComponent } from './components/attendence/attendence.component';
import { MonthlyCalComponent } from './components/monthly-cal/monthly-cal.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    // { path: 'services', component: ServiceComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'manager', component: ManagerComponent },
    { path: 'staff', component: StaffComponent },
    { path: 'machines', component: MachinesComponent },
    { path: 'dsr-reading', component: DsrReadingComponent },
    { path: 'calculations', component: CalculationsComponent },
    { path: 'staff-attendance', component: AttendenceComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'monthly', component: MonthlyCalComponent },
  
    // Redirect to dashboard if no route matches
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'dashboard' }
];
