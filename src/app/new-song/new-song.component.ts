import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-new-song',
  templateUrl: './new-song.component.html',
  styleUrls: ['./new-song.component.sass']
})
export class NewSongComponent implements OnInit {

  disabled: boolean = false;
  newSongData: { artist: string; name: string; };
  constructor(private http: Http) {
    this.newSongData = {
      artist: null,
      name: null
    }
  }

  ngOnInit() {
  }

  newSong() {
    this.disabled = true;
    this.http.post('//localhost:5000/addSong', this.newSongData).subscribe(x => {
      alert('Song created!')
      this.disabled = false;
      this.newSongData = {
        artist: null,
        name: null
      }
    })
  }
}
