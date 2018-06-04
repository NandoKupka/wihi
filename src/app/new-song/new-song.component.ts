import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

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
  noresult: boolean = false;
  disabled: boolean = false;
  newSongData: { artist: String; name: String; };
  constructor(private http: Http, private router: Router) {
    this.newSongData = {
      name: null,
      artist: null
    }
  }

  ngOnInit() {
  }

  setArtist(ev) {
    this.newSongData.artist = this.filteredOptions.find(x => x.name == this.currentFilter)
  }

  keyInput(ev) {
    this.filteredOptions = []
    this.noresult = false
    console.log('looking for... ', this.currentFilter)
    this.currentFilter = ev.target.value
    this.isWaitingKeypress = true;
    if (this.isWaitingKeypress) {
      window.clearTimeout(this.timeout)
    }
    this.timeout = window.setTimeout(x => {
      this.doFilter(this.currentFilter).subscribe(res => {
        this.filteredOptions = res.json();
        if (res.json().length < 1) {
          this.noresult = true;
        }
      },(err) => {
        this.filteredOptions = [{name: "No results"}]
      })
    }, 700)
  }

  createArtist() {
    this.router.navigate(['', 'newArtist'])
  }

  doFilter(term: String) {
    return this.http.post('//localhost:3000/searchArtist', {term: term})
  }

  newSong() {
    this.disabled = true;
    if (this.newSongData.artist) {
      this.http.post('//localhost:3000/addSong', this.newSongData).subscribe(x => {
        alert('Song created!')
        this.disabled = false;
        this.currentFilter = ''
        this.newSongData = {
          artist: null,
          name: null
        }
      },(err) => {
        alert(err._body)
        this.currentFilter = ''
      });
    }
    else {
      alert("Please, select or create the artist!")
    }
  }
}
