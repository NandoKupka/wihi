import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-new-song',
  templateUrl: './new-song.component.html',
  styleUrls: ['./new-song.component.sass']
})
export class NewSongComponent implements OnInit {
  currentFilter: string;
  options: string[];
  filteredOptions: any[];
  timeout: number;
  isWaitingKeypress: boolean;

  disabled: boolean = false;
  newSongData: { artist: String; name: String; };
  constructor(private http: Http) {
    this.newSongData = {
      name: null,
      artist: null
    }
  }

  ngOnInit() {
  }

  keyInput(ev) {
    this.filteredOptions = []
    console.log('looking for... ', this.currentFilter)
    this.currentFilter = ev.target.value
    this.isWaitingKeypress = true;
    if (this.isWaitingKeypress) {
      window.clearTimeout(this.timeout)
    }
    this.timeout = window.setTimeout(x => {
      this.doFilter(this.currentFilter).subscribe(res => {
        this.filteredOptions = res.json();
      },(err) => {
        this.filteredOptions = [{name: "No results"}]
      })
    }, 700)
  }

  setArtist(ev) {
    this.newSongData;
  }

  doFilter(term: String) {
    return this.http.post('//localhost:3000/searchArtist', {term: term})
  }

  newSong() {
    this.disabled = true;
    this.http.post('//localhost:3000/addSong', this.newSongData).subscribe(x => {
      alert('Song created!')
      this.disabled = false;
      this.newSongData = {
        artist: null,
        name: null
      }
    },(err) => {
      alert(err)
    });
  }
}
