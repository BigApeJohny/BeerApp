import { Component, Input, EventEmitter, Output } from '@angular/core';
import { BeerView } from './../../../brew-page/components/beer/beer.component';
import { Beer } from './../../../../models/beer.interface';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.scss']
})
export class BeerListComponent {

  @Input() brewer: string;
  @Input() beers: Array<Beer>;
  @Input() brewers: Array<string>;
  @Input() totalBeersCount: number;
  @Input() id: number;

  @Output() onSelectListChange = new EventEmitter<{ brewer: string, id: number}>();
  @Output() onLoadMoreBtnClick = new EventEmitter<{ brewer: string, id: number}>();

  constructor() { }

  public generateBeerViewData(beer: Beer): BeerView {
    return beer !== undefined ? {
      pricePerLitre: beer.price,
      name: beer.name,
      imageUrl: beer.image_url,
      type: beer.type,
    } : undefined;
  }

  public handleOnSelectChange(brewer: string): void {
    this.brewer = brewer;
    this.onSelectListChange.emit({ brewer, id: this.id });
  }

  public loadMoreBeers(): void {
    this.onLoadMoreBtnClick.emit({ brewer: this.brewer, id: this.id });
  }

}
