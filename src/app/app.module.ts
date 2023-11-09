import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChartjsComponent } from './chartjs/chartjs.component';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { CustomToolbarComponent } from './custom-toolbar/custom-toolbar.component';
import { MatTabsModule } from '@angular/material/tabs';
@NgModule({
  declarations: [AppComponent, FileUploadComponent, ChartjsComponent, CustomToolbarComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatMenuModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule,
    NgxMatTimepickerModule,
    MatTabsModule,
  ],
  exports: [MatButtonModule, MatInputModule, MatIconModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
