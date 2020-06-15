import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { Song } from '../song.model';
import { SongsService } from '../songs.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SongListComponent implements OnInit, OnDestroy
{

  songs: Song[] = [];
  isLoading = false;
  private songsSub: Subscription;
  filtered_songs: Song[] = [];
  search = '';

  constructor(public songsService: SongsService) { }

  ngOnInit() {
    this.isLoading = true;
    this.songsService.getSongs();
    this.songsSub = this.songsService.getSongUpdateListener()
    .subscribe((songs: Song[]) => {
      this.isLoading = false;
      this.songs = songs;
      console.log(this.songs);
    });

  }

  onDelete(songId: string) {
    this.songsService.deleteSong(songId);
  }

  ngOnDestroy() {
    this.songsSub.unsubscribe();
  }

  onSearchChange() {
    console.log(this.search);
    this.filtered_songs = this.songs.filter((song) => {
      return song.singer.toLowerCase().includes(this.search.toLowerCase()) || song.title.toLowerCase().includes(this.search.toLowerCase());
    });
  }

}
