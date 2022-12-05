import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CenterManagementComponent } from './checklist-component/components/center-management/center-management.component';
import { ChecklistDashboardComponent } from './checklist-component/components/checklist-dashboard/checklist-dashboard.component';
import { DashboardComponent } from './checklist-component/components/dashboard/dashboard.component';
import { LoginFormComponent } from './checklist-component/components/login-form/login-form.component';
import { MISreportComponent } from './checklist-component/components/misreport/misreport.component';
import { OverviewComponent } from './checklist-component/components/overview/overview.component';
import { KraKpiOverviewComponent } from './KRA_KPI/kra-kpi-overview/kra-kpi-overview.component';
import { AuthGuard } from './New folder/auth.guard';
import { TimeOverviewComponent } from './TimeSheet/time-overview/time-overview.component';
import { ValidateUserComponent } from './views/validate-user/validate-user.component';
// import { KraoverviewComponent } from './KRA_KPI/kraoverview/kraoverview.component';

// Import Containers

export const routes: Routes = [

  {
    path: 'overview',
    component: OverviewComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'overview'
    }
  },
  {
    path: 'KRA-overview',
    component: KraKpiOverviewComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'overview'
    }
  },
  
  {
    path: 'misreport',
    component: MISreportComponent,
    data: {
      title: 'MISreport'
    
  },
},
  
  {
    path: 'timesheet',
    component: TimeOverviewComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'overview'
    }
  },
  
  
  {
    path: 'overviewdashboard',
    component: ChecklistDashboardComponent,
   
    data: {
      title: 'overviewdashboard'
    }
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: 'CenterManagement',
    component: CenterManagementComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'CenterManagement'
    }
  },
  {
    path: 'login',
    component: LoginFormComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'validateUser',
    component: ValidateUserComponent,
    data: {
      title: 'validate'
    }

  },
  // {
  //   path: 'KRAOverview',
  //   component: KraoverviewComponent,
  //   data: {
  //     title: 'Register Page'
  //   }
  // },

  {
    path: '',
    component: LoginFormComponent,
    data: {
      title: 'login'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }