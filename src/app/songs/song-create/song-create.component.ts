import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { SongsService } from "../songs.service";
import { Song } from "../song.model";

@Component({
  selector: 'app-song-create',
  templateUrl: './song-create.component.html',
  styleUrls: ['./song-create.component.css']
})
export class SongCreateComponent implements OnInit {

  enteredTitle = "";
  enteredContent = "";
  song: Song;
  isLoading = false;
  private mode = "create";
  private songId: string;

  constructor(
    public songsService: SongsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("songId")) {
        this.mode = "edit";
        this.songId = paramMap.get("songId");
        this.isLoading = true;
        this.songsService.getSong(this.songId).subscribe(songData => {
          this.isLoading = false;
          this.song = {id: songData._id, title: songData.title, content: songData.content, singer: songData.singer, category: songData.category};
        });
      } else {
        this.mode = "create";
        this.songId = null;
      }
    });
  }

  onSaveSong(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.songsService.addSong(form.value.title, form.value.content, form.value.singer, form.value.category = null);
    } else {
      this.songsService.updateSong(
        this.songId,
        form.value.title,
        form.value.content,
        form.value.singer,
        form.value.category = null
      );
    }
    form.resetForm();
  }
}
