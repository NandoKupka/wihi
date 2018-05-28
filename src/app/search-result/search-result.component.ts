import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.sass']
})
export class SearchResultComponent implements OnInit {
  results: { name: string; image: string;category: string }[];
  searchTerm: any;

  constructor(private activatedRoute: ActivatedRoute) {
    this.results = [
      {
        name: "Grand Theft Auto: San Andreas",
        image: "https://images-na.ssl-images-amazon.com/images/I/51SV62HXM1L._SY445_.jpg",
        category: "Game"
      },
      {
        name: "Guitar Hero II",
        image: "data:image/jpeg;base64,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",
        category: "Game"
      },
      {
        name: "Kingsman",
        image: "https://i2.wp.com/substreammagazine.com/wp-content/uploads/Kingsman-Poster-Large.jpg?fit=200%2C2665&ssl=1",
        category: "Movie"
      }
    ]
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.searchTerm = params['term']
    })
  }

}