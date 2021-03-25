import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CookieServiceService } from './../cookie-service/cookie-service.service';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  private darkMode: boolean = false;

  public sidebarVisibilityChange: Subject<boolean> = new Subject<boolean>();

  constructor(private cookieService: CookieServiceService) {
    const value = (this.cookieService.brewPageSettings !== null) ? this.cookieService.brewPageSettings.darkMode : null;
    this.setDarkMode(value !== null ? value : false);
  }

  public getDarkMode = (): boolean => this.darkMode;

  public setDarkMode(value: boolean): void {
    this.darkMode = value;
    this.sidebarVisibilityChange.next(this.darkMode);
  }

}
