import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { DarkModeService } from './providers/dark-mode/dark-mode.service';
import { CookieServiceService } from './providers/cookie-service/cookie-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'beer-app';

  @HostBinding('class') className = '';

  toggleControl = new FormControl(false);

  constructor(
    private overlay: OverlayContainer,
    private darkMode: DarkModeService,
    private cookieService: CookieServiceService
    ) { }

  ngOnInit(): void {
    this.listenDarkModeChanges();
  }

  private setDarkMode(value: boolean) {
    const darkClassName = 'darkMode';
    this.className = value ? darkClassName : '';
    if (value) {
      this.overlay.getContainerElement().classList.add(darkClassName);
    } else {
      this.overlay.getContainerElement().classList.remove(darkClassName);
    }
  }

  private listenDarkModeChanges() {
    const value = (this.cookieService.brewPageSettings !== null) ? this.cookieService.brewPageSettings.darkMode : false;
    this.setDarkMode(value);
    this.darkMode.sidebarVisibilityChange.subscribe(value => {
      this.setDarkMode(value);
    });
  }
}
