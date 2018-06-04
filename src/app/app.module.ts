import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { SplashComponent } from './splash/splash.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { NewSongComponent } from './new-song/new-song.component';
import { HttpModule } from '@angular/http';
import { NewArtistComponent } from './new-artist/new-artist.component';
import { NewReferenceComponent } from './new-reference/new-reference.component';
import { NewListComponent } from './new-list/new-list.component';

const appRoutes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'search/:term', component: SearchResultComponent },
  { path: 'newSong', component: NewSongComponent },
  { path: 'newArtist', component: NewArtistComponent },
  { path: 'newReference', component: NewReferenceComponent },
  { path: 'newList', component: NewListComponent },

];

@NgModule({
  declarations: [
    SplashComponent,
    AppComponent,
    SearchResultComponent,
    NewSongComponent,
    NewArtistComponent,
    NewReferenceComponent,
    NewListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    MatInputModule,
    MatAutocompleteModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
