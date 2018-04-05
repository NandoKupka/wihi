import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { SplashComponent } from './splash/splash.component';

const appRoutes: Routes = [
  { path: '', component: SplashComponent },
];

@NgModule({
  declarations: [
    SplashComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
