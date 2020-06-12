import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Song } from "./song.model";
import { getMultipleValuesInSingleSelectionError } from "@angular/cdk/collections";

@Injectable({ providedIn: "root" })
export class SongsService {
  private songs: Song[] = [];
  private songsUpdated = new Subject<Song[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getSongs() {
    this.http
      .get<{ message: string; songs: any }>("https://myguitar-api.herokuapp.com/songs")
      .pipe(
        map(songData => {
          console.log(songData);
          return songData.songs.map(song => {
            return {
              title: song.title,
              singer: song.singer,
              content: song.content,
              id: song._id,
              category: song.category
            };
          });
        })
      )
      .subscribe(transformedSongs => {
        this.songs = transformedSongs;
        this.songsUpdated.next([...this.songs]);
      });
  }


  getSongUpdateListener() {
    return this.songsUpdated.asObservable();
  }

  getSong(id: string) {
    return this.http.get<{ _id: string; title: string; content: string; singer: string; category: string }>(
      "https://myguitar-api.herokuapp.com/songs/" + id
    );
  }

  addSong(title: string, content: string, singer: string, category: string) {
    const song: Song = { id: null, title: title, content: content, singer: singer, category: "category" };
    this.http
      .post<{ message: string; songId: string }>(
        "https://myguitar-api.herokuapp.com/songs",
        song
      )
      .subscribe(responseData => {
        const id = responseData.songId;
        song.id = id;
        this.songs.push(song);
        this.songsUpdated.next([...this.songs]);
        this.router.navigate(["/"]);
      });
  }

  updateSong(id: string, title: string, content: string, singer: string, category: string) {
    const song: Song = { id: id, title: title, content: content, singer: singer, category: "category" };
    this.http
      .put("https://myguitar-api.herokuapp.com/songs/" + id, song)
      .subscribe(response => {
        const updatedSongs = [...this.songs];
        const oldSongIndex = updatedSongs.findIndex(p => p.id === song.id);
        updatedSongs[oldSongIndex] = song;
        this.songs = updatedSongs;
        this.songsUpdated.next([...this.songs]);
        this.router.navigate(["/"]);
      });
  }

  deleteSong(songId: string) {
    this.http
      .delete("https://myguitar-api.herokuapp.com/songs/" + songId)
      .subscribe(() => {
        const updatedSongs = this.songs.filter(song => song.id !== songId);
        this.songs = updatedSongs;
        this.songsUpdated.next([...this.songs]);
      });
  }
}
