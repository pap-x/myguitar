import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MaterialModule} from './modules/material.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SongsComponent } from './songs/songs.component';
import { SongCreateComponent } from './songs/song-create/song-create.component';
import { SongListComponent } from './songs/song-list/song-list.component';
import { AppRoutingModule } from './modules/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SongsComponent,
    SongCreateComponent,
    SongListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
