import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportDetailsComponent } from './report-details/report-details.component';
import { ReportFormComponent } from './report-form/report-form.component';
import {FormsModule} from '@angular/forms';
import {MDBBootstrapModule} from 'angular-bootstrap-md';

const appRoutes: Routes = [
  {path: '', component: ReportListComponent},
  {path: 'details/:id', component: ReportDetailsComponent},
  {path: 'form/:id', component: ReportFormComponent},
  {path: 'form', component: ReportFormComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ReportListComponent,
    ReportDetailsComponent,
    ReportFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    ),
    FormsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule {
}
