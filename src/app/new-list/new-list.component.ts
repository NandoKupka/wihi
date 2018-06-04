import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.sass']
})
export class NewListComponent implements OnInit {
  reference: any;
  newSongData: any;
  options: string[];
  filteredOptions: any[];
  currentFilter: string;
  noresult: boolean = false;
  isWaitingKeypress: boolean;
  timeout: number;

  list: string;
  constructor(private http: Http) {
    this.list = ""
  }

  ngOnInit() {
  }

  setReference(ev) {
    this.reference = this.filteredOptions.find(x => x.name == this.currentFilter)
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

  doFilter(term: String) {
    return this.http.post('//localhost:3000/searchReference', {term: term})
  }

  newSong(songData) {
    return this.http.post('//localhost:3000/addSong', songData)
  }

  addSongReference(refId, songId) {
    debugger;
    let songReference = {
      reference: refId || null,
      song: songId || null,
      like: 0,
      dislike: 0
    }
    this.http.post('//localhost:3000/addSongReference', songReference ).subscribe(result => {

    })
  }

  sendList() {
    let eachSong = []
    let songs = this.list.split('\n')
    songs.forEach((x, i) => {
      eachSong.push(x.split(' | '))

      this.http.post('//localhost:3000/searchExactArtist', { term: eachSong[i][1]} ).subscribe(artistResult => {
        if (artistResult.json().length < 1) {
          this.http.post('//localhost:3000/addArtist', {name: eachSong[i][1]}).subscribe(art => {
            let newSongData = {
              name: eachSong[i][0],
              artist: art.json()
            }
            this.newSong(newSongData).subscribe(songInfo => {
              this.addSongReference(this.reference._id, songInfo.json()._id)
            });
          })
        }
        else {
          this.http.post('//localhost:3000/searchExactSong', { term: eachSong[i][0]} ).subscribe(songResult => {
            if (songResult.json().length < 1) {
              let newSongData = {
                name: eachSong[i][0],
                artist: songResult.json()[0]
              }
              this.newSong(newSongData).subscribe(songInfo => {
                this.addSongReference(this.reference._id, songInfo.json()._id)
              });
            }
          });
        }
      })
    });
  }
}