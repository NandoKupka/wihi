import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {
    this.options = []
  }

  ngOnInit() {
  }

  keyInput(ev) {
    this.filteredOptions = []
    console.log('oloook', this.currentFilter)
    this.currentFilter = ev.target.value
    this.isWaitingKeypress = true;
    if (this.isWaitingKeypress) {
      window.clearTimeout(this.timeout)
    }
    this.timeout = window.setTimeout(x => {
      this.doFilter(this.currentFilter).then(res => {
        this.filteredOptions = res;
      })
    }, 700)
  }

  doSearch() {
    setTimeout(x => {
      this.router.navigate(['', 'search', this.currentFilter])
    }, 200)
  }

  doFilter(term: String) {
    console.log('oi')
    return new Promise<any[]>(function(resolve, reject) {
      setTimeout(x => {
        if (term.toUpperCase() == 'free'.toUpperCase())
          resolve(['Free Bird', 'Free as Bird'])
        else
          resolve(['Teste', 'Teste'])
        }, 100)
    });
  }
}
