import { Injectable } from '@angular/core';
import { BrewPageSettings } from './../../pages/brew-page/components/settings-dialog/settings-dialog.component'
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieServiceService {

  public brewPageSettings: BrewPageSettings = null;
  public brewPageActiveBrewers: Array<object> = [];

  constructor(private cookieService: CookieService) {
    this.getAllCookies();
  }

  private getAllCookies(): void {
    this.brewPageSettings = this.getBrewPageSettingsCookies();
    this.brewPageActiveBrewers = this.getBrewPageActiveBrewers();
  }

  public setBrewPageSettingsCookies(settings: BrewPageSettings): void {
    this.cookieService.set('brew-page-settings', JSON.stringify(settings));
  }

  public setBrewPageActiveBrewersCookies(brewers: Array<object>): void {
    this.cookieService.set('brew-page-active-brewers', JSON.stringify(brewers));
  }

  private getBrewPageSettingsCookies(): BrewPageSettings {
    const cookieValue = this.cookieService.get('brew-page-settings');
    const settings: BrewPageSettings = (cookieValue !== '' && cookieValue !== undefined && cookieValue !== 'undefined') ? JSON.parse(cookieValue) : null;
    return settings;
  }

  private getBrewPageActiveBrewers(): Array<object> {
    const cookieValue = this.cookieService.get('brew-page-active-brewers');
    return (cookieValue !== '' && cookieValue !== undefined && cookieValue !== 'undefined') ? JSON.parse(cookieValue) : [];
  }
}
