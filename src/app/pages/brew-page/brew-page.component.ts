import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingsDialogComponent } from './components/settings-dialog/settings-dialog.component';
import { BrewServiceService } from './../../providers/brew-service/brew-service.service';
import { BrewPageSettings } from './components/settings-dialog/settings-dialog.component';
import { CookieServiceService } from './../../providers/cookie-service/cookie-service.service';
import { Beer } from './../../models/beer.interface';

@Component({
  selector: 'app-brew-page',
  templateUrl: './brew-page.component.html',
  styleUrls: ['./brew-page.component.scss']
})
export class BrewPageComponent implements OnInit {

  public brewerSelectColumns = [
    {
      beers: [],
      brewers: [],
      totalBeersCount: 0,
      activeBrewer: '',
    },
    {
      beers: [],
      brewers: [],
      totalBeersCount: 0,
      activeBrewer: '',
    },
    {
      beers: [],
      brewers: [],
      totalBeersCount: 0,
      activeBrewer: '',
    }
  ];

  public beersByBrewer = {};

  public brewPageSettings: BrewPageSettings = {
    itemsPerList: 15,
    darkMode: false,
    sortOption: { name: 'name', value: 1 },
  }

  constructor(
    private brewService: BrewServiceService,
    private dialog: MatDialog,
    private cookieService: CookieServiceService,
    ) { }

  ngOnInit(): void {
    this.getBrewPageSettings();
    this.getBeers();
  }

  public onListBeerChange(value: { brewer: string, id: number }): void {
    this.setBeersInSelectList(value.id, value.brewer);
    this.saveActiveColumnsToCookies();
  }

  public onLoadMoreBeers(value: { brewer: string, id: number }): void {
    this.loadMoreBeers(value.brewer, value.id);
  }

  private setBeersInSelectList(id: number, brewer: string): void {
    this.brewerSelectColumns[id].activeBrewer = brewer;
    this.laodBeersForSelectList(brewer, id);
  }

  private getBeers(): void {
    this.brewService.getBeers().subscribe((beers: Array<Beer>): void => {
      beers.forEach(beer => {
        const brewerBeers = this.beersByBrewer[beer.brewer];
        this.beersByBrewer[beer.brewer] = (brewerBeers === undefined) ? [beer] : [...brewerBeers, beer];
        this.brewerSelectColumns.forEach(column => column.brewers = Object.keys(this.beersByBrewer));
      });
      this.sortBeersBy('name');
      this.fillBeerListsFromCookies();
    });
  }

  private laodBeersForSelectList(brewer: string, beersListId: number): void {
    this.brewerSelectColumns[beersListId].totalBeersCount = this.beersByBrewer[brewer].length;
    this.brewerSelectColumns[beersListId].beers = this.beersByBrewer[brewer].slice(0, +this.brewPageSettings.itemsPerList);
  }

  private loadMoreBeers(brewer: string, beersListId: number): void {
    let actualBrewerBeers = this.brewerSelectColumns[beersListId].beers;
    const newBeers = this.beersByBrewer[brewer].slice(actualBrewerBeers.length, actualBrewerBeers.length + +this.brewPageSettings.itemsPerList);
    this.brewerSelectColumns[beersListId].beers = [...actualBrewerBeers, ...newBeers];
  }

  private getBrewPageSettings(): void {
    const cookieBrewSettingss = this.cookieService.brewPageSettings;
    this.brewPageSettings = (cookieBrewSettingss !== null) ? cookieBrewSettingss : this.brewPageSettings;
  }

  private sortBeersBy(value: string): void {
    this.brewerSelectColumns.forEach(column => {
      column.beers.sort((a, b) => {
        if (value === 'price') {
          return a[value] - b[value];
        } else {
          return('' + a[value]).localeCompare(b[value]);
        }
      });
    });
  }

  public toggleShowSettingsDialog(): void {
    const dialogRef = this.dialog.open(SettingsDialogComponent, {
      data: this.brewPageSettings
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.brewPageSettings = result;
        this.cookieService.setBrewPageSettingsCookies(this.brewPageSettings);
        this.sortBeersBy(this.brewPageSettings.sortOption.name);
      }
    });
  }

  private saveActiveColumnsToCookies(): void {
    this.cookieService.setBrewPageActiveBrewersCookies(this.brewerSelectColumns.map((column, index) => ({
      brewer: column.activeBrewer,
      id: index
    })));
  }

  private fillBeerListsFromCookies(): void {
    this.cookieService.brewPageActiveBrewers.forEach(list => {
      if (list['brewer'] !== undefined && list['brewer'] !== '') {
        this.brewerSelectColumns[list['id']].activeBrewer = list['brewer'];
        this.laodBeersForSelectList(list['brewer'], list['id']);
      }
    });
  }

}
