import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-new-artist',
  templateUrl: './new-artist.component.html',
  styleUrls: ['./new-artist.component.sass']
})
export class NewArtistComponent implements OnInit {
  disabled: boolean = false;
  newArtistData: { name: string; };
  constructor(private http: Http) {
    this.newArtistData = {
      name: null
    }
  }

  ngOnInit() {
  }

  newArtist() {
    this.disabled = true;
    this.http.post('//localhost:3000/addArtist', this.newArtistData).subscribe(x => {
      alert('Artista criado!')
      this.disabled = false;
      this.newArtistData = {
        name: null
      }
    },(err) => {
      alert(err._body)
      this.disabled = false;
      this.newArtistData = {
        name: null
      }
    })
  }
}
