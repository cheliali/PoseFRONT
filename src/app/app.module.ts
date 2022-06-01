import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { Poomsae1Component } from './pages/poomsae1/poomsae1.component';
import { Pos1Component } from './positions/pos1/pos1.component';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { PoseSelectionComponent } from './pages/pose-selection/pose-selection.component';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { PosePracticeComponent } from './pages/pose-practice/pose-practice.component';
import { SliderModule } from 'primeng/slider';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    Poomsae1Component,
    Pos1Component,
    NavBarComponent,
    PoseSelectionComponent,
    PosePracticeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TableModule,
    DataViewModule,
    SliderModule,
    // ContextMenuModule,
    // DropdownModule,
    ButtonModule,
    // ToastModule,
    InputTextModule,
    // ProgressBarModule,
    HttpClientModule,
    // FormsModule,
    TabViewModule,
    RatingModule,
    MenubarModule,
    CardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
