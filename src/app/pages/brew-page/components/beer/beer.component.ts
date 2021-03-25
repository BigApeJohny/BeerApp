import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ImageModalComponent } from './../image-modal/image-modal.component';

export interface BeerView {
  name: string;
  type: string;
  pricePerLitre: string;
  imageUrl: string;
}

@Component({
  selector: 'app-beer',
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.scss']
})

export class BeerComponent {

  @Input() beerViewData: BeerView;

  constructor(private dialog: MatDialog,) { }

  public openImageModal(): void {
    this.dialog.open(ImageModalComponent, { data: this.beerViewData.imageUrl });
  }
}
