import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, CommonModule, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';
import { HttpClientModule } from '@angular/common/http';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';
import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,


} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { MatSidenavModule } from '@angular/material/sidenav'
import { NgOtpInputModule } from 'ng-otp-input';
// import { GridModule } from '@syncfusion/ej2-angular-grids';

import { ToastModule, NavbarModule, WavesModule } from 'ng-uikit-pro-standard';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// import { PdfViewerModule } from 'ng2-pdf-viewer';



import { MatIconModule } from '@angular/material/icon';
import { OverviewComponent } from './checklist-component/components/overview/overview.component';
import { LoginFormComponent } from './checklist-component/components/login-form/login-form.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChecklistControlComponent } from './checklist-component/components/checklist-control/checklist-control.component';
import { ChecklistSubmitComponent } from './checklist-component/components/checklist-submit/checklist-submit.component'; import { MatSliderModule, } from '@angular/material/slider';
import { AddQuestionsComponent } from './checklist-component/components/checklist-control/add-questions/add-questions.component'
import { DialogueBoxComponent } from './control/dialogue-box/dialogue-box.component';
import { MatDatepickerModule } from '@angular/material/datepicker'

import { ChecklistAppquesansComponent } from './checklist-component/components/checklist-approval/checklist-appQuesAns/checklist-appQuesAns.component';
import { ShowQuestionsComponent } from './checklist-component/components/checklist-control/show-questions/show-questions.component';
import { CenterManagementComponent } from './checklist-component/components/center-management/center-management.component';
import { DashboardComponent } from './checklist-component/components/dashboard/dashboard.component';
import { otpComponent } from './checklist-component/components/checklist-approval/otp/otp.component';

import { GridComponent } from './control/grid/grid.component';
import { EmpWiseChecklistsComponent } from './checklist-component/components/checklist-assignment/emp-wise-checklists/emp-wise-checklists.component';
import { EmployeeListComponent } from './checklist-component/components/checklist-assignment/employee-list/employee-list.component';
import { ChecklistAssignmentComponent } from './checklist-component/components/checklist-assignment/checklist-assignment.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { ValidateUserComponent } from './views/validate-user/validate-user.component';

import { MatInputModule } from '@angular/material/input';
import { ChecklistDashboardComponent } from './checklist-component/components/checklist-dashboard/checklist-dashboard.component';
import { TimeOverviewComponent } from './TimeSheet/time-overview/time-overview.component';
import { TimeApprovalComponent } from './TimeSheet/time-approval/time-approval.component';
import { TimeAssignComponent } from './TimeSheet/time-assign/time-assign.component';
import { EmplistComponent } from './TimeSheet/time-assign/emplist/emplist.component';
import { EmpTaskComponent } from './TimeSheet/time-assign/emp-task/emp-task.component';
import { TimeConfigureComponent } from './TimeSheet/time-configure/time-configure.component';
//import { ChecklistApprovalComponent } from './checklist-component/components/checklist-approval/checklist-approval.component';

import { MISreportComponent } from './checklist-component/components/misreport/misreport.component';
import { KraKpiConfigureComponent } from './KRA_KPI/kra-kpi-configure/kra-kpi-configure.component';
import { KraKpiAssignComponent } from './KRA_KPI/kra-kpi-assign/kra-kpi-assign.component';

import { KraKpiApprovalComponent } from './KRA_KPI/kra-kpi-approval/kra-kpi-approval.component';
import { KraKpiOverviewComponent } from './KRA_KPI/kra-kpi-overview/kra-kpi-overview.component';
import { KraKpiDashboardComponent } from './KRA_KPI/kra-kpi-dashboard/kra-kpi-dashboard.component';

import { ChecklistApprovalComponent } from './checklist-component/components/checklist-approval/checklist-approval.component';
import { ShowTasklistComponent } from './TimeSheet/time-approval/show-tasklist/show-tasklist.component';
import { TimesheetBarchartComponent } from './TimeSheet/time-sheet-dashboard/timesheet-barchart/timesheet-barchart.component';
import { TimeTaskComponent } from './TimeSheet/time-configure/time-task/time-task.component';
import { DeptprojectlistComponent } from './TimeSheet/time-assign/deptprojectlist/deptprojectlist.component';
import { DepartlistComponent } from './TimeSheet/time-assign/departlist/departlist.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { KraKpiSubmitComponent } from './KRA_KPI/kra-kpi-submit/kra-kpi-submit.component';
import { TimeSubmitComponent } from './TimeSheet/time-submit/time-submit.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import {MatProgressBarModule} from '@angular/material/progress-bar';

// import { DetailsComponent } from './KRA_KPI/details/details.component';
// import { ImageviewComponent } from './KRA_KPI/imageview/imageview.component';

// import { TimesheetComponent } from './checklist-component/components/timesheet/timesheet.component';
// import { KraoverviewComponent } from './KRA_KPI/kraoverview/kraoverview.component';
// import { KraconfigureComponent } from './KRA_KPI/kraconfigure/kraconfigure.component';
// import { AddChildComponent } from './KRA_KPI/kraconfigure/add-child/add-child.component';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    IconModule,
    IconSetModule.forRoot(),
    HttpClientModule,
    ModalModule,
    FormsModule,
    MatSliderModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule,
    CommonModule,
    ToastModule.forRoot(),
    MatSidenavModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgOtpInputModule,
    MatIconModule,
    NavbarModule,
    WavesModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDialogModule,
    ChartsModule,
    MatInputModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    ProgressbarModule,
    MatProgressBarModule
    // PdfViewerModule

  ],
  declarations: [
    AppComponent,
    OverviewComponent,
    ChecklistAssignmentComponent,
    LoginFormComponent,
    ChecklistControlComponent,
    ChecklistSubmitComponent,
    GridComponent,
    AddQuestionsComponent,
    ChecklistSubmitComponent,
    ChecklistApprovalComponent,
    ChecklistAppquesansComponent,
    DialogueBoxComponent,
    ShowQuestionsComponent,
    EmployeeListComponent,
    EmpWiseChecklistsComponent,
    CenterManagementComponent,
    DashboardComponent,
    otpComponent,
    ValidateUserComponent,
    ChecklistDashboardComponent,
    // TimeSheetDashboardComponent,
    TimeSubmitComponent,
    TimeOverviewComponent,
    TimeApprovalComponent,
    TimeAssignComponent,
    EmplistComponent,
    EmpTaskComponent,
    TimeConfigureComponent,
    MISreportComponent,
    KraKpiConfigureComponent,
    KraKpiAssignComponent,
    KraKpiSubmitComponent,
    KraKpiApprovalComponent,
    KraKpiOverviewComponent,
    KraKpiDashboardComponent,
    ShowTasklistComponent,
    TimesheetBarchartComponent,
    TimeTaskComponent,
    DeptprojectlistComponent,
    DepartlistComponent
    // DetailsComponent,
    // ImageviewComponent,
    // TimesheetComponent,
    // KraoverviewComponent,
    // KraconfigureComponent,
    // AddChildComponent

  ],

  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy

    },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    IconSetService,
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }