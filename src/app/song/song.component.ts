import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.sass']
})
export class SongComponent implements OnInit {

  refs: any[];
  songData: any;
  results: { name: string; image: string;category: string }[];
  songId: any;
  constructor(private activatedRoute: ActivatedRoute, private http: Http) {}
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.songId = params['term']
      this.http.get('//localhost:3000/getSongData/'+this.songId ).subscribe(data => {
        this.songData = data.json();
        this.refs = []
        Array.from(this.songData.references).forEach(ref => {
          this.http.get('//localhost:3000/getReferenceData/'+ ref['reference'] ).subscribe(refData => {
            this.refs.push(refData.json())
          });
        });
      })
    })
  }
}
