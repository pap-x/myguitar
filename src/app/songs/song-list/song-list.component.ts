import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Song } from '../song.model';
import { SongsService } from '../songs.service';
@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit, OnDestroy
{

  songs: Song[] = [];
  isLoading = false;
  private songsSub: Subscription;
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

}
