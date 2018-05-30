import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-new-reference',
  templateUrl: './new-reference.component.html',
  styleUrls: ['./new-reference.component.sass']
})
export class NewReferenceComponent implements OnInit {
  disabled: boolean = false;
  newReferenceData: {
    name: String,
    category: String,
    imageUrl: String,
    description: String
  };
  constructor(private http: Http) {
    this.newReferenceData = {
      name: null,
      category: null,
      imageUrl: null,
      description: null
    }
  }

  ngOnInit() {
  }

  newReference() {
    this.disabled = true;
    this.http.post('//localhost:3000/addReference', this.newReferenceData).subscribe(x => {
      alert(x.json())
      this.disabled = false;
      this.newReferenceData = {
        name: null,
        category: null,
        imageUrl: null,
        description: null
      }
    },(err) => {
      alert(err._body)
      this.disabled = false;
      this.newReferenceData = {
        name: null,
        category: null,
        imageUrl: null,
        description: null
      }
    })
  }
}
