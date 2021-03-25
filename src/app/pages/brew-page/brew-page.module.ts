import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BrewPageComponent } from './brew-page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';


import { BrewServiceService } from './../../providers/brew-service/brew-service.service';
import { CookieServiceService } from './../../providers/cookie-service/cookie-service.service';
import { SettingsDialogComponent } from './components/settings-dialog/settings-dialog.component';
import { BeerComponent } from './components/beer/beer.component';
import { BeerListComponent } from './components/beer-list/beer-list.component';
import { ImageModalComponent } from './components/image-modal/image-modal.component';



@NgModule({
  declarations: [BrewPageComponent, SettingsDialogComponent, BeerComponent, BeerListComponent, ImageModalComponent],
  imports: [
    CommonModule,
    MatGridListModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatSlideToggleModule,
    MatInputModule
  ],
  providers: [
    BrewServiceService,
    CookieServiceService
  ]
})
export class BrewPageModule { }
