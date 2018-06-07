import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.sass']
})
export class SplashComponent implements OnInit {
  currentFilter: string;
  options: string[];
  filteredOptions: any[];
  timeout: number;
  isWaitingKeypress: boolean;

  constructor(private router: Router, private http: Http) {
    this.options = []
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
        this.filteredOptions = [{name: "No results", artist: "Sorry"}]
      })
    }, 700)
  }

  doSearch(song) {
    this.filteredOptions = []
    debugger;
    setTimeout(x => {
      this.router.navigate(['', 'song', song._id])
    }, 200)
  }

  doFilter(term: String) {
    return this.http.post('//localhost:3000/searchSong', {term: term})
  }
}
