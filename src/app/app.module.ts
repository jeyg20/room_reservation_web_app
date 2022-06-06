import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PostCreateComponent } from './posts/post-create/post-create.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatInputModule } from '@angular/material/input';
import {MatFormFieldModule } from "@angular/material/form-field";
import {MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule } from '@angular/material/toolbar';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {HeaderComponent} from "./header/header.component";

import{PostListComponent} from "./posts/post-list/post-list.component";

import {MatExpansionModule}from '@angular/material/expansion'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import{HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatRadioModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
