import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { DarkModeService } from './../../../../providers/dark-mode/dark-mode.service';

export interface SortOption {
  value: number;
  name: string;
}

export interface BrewPageSettings {
  itemsPerList: number;
  darkMode: boolean;
  sortOption: SortOption;
}

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})

export class SettingsDialogComponent implements OnInit {

  public darkModeValue: boolean = false;

  public brewSortoptions: Array<SortOption> = [
    {
      name: 'name',
      value: 1
    },
    {
      name: 'price',
      value: 2
    },
    {
      name: 'type',
      value: 3
    },
  ];

  constructor(
    public dialogRef: MatDialogRef<SettingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BrewPageSettings,
    private darkModeService: DarkModeService,
    ) { }

    ngOnInit(): void {
      this.setDarkModeToggleValue();
    }

    public handleOnToggleChange($event: any): void {
      this.data.darkMode = $event.checked;
      this.darkModeService.setDarkMode($event.checked);
    }

    public handleCancelClick(): void {
      this.dialogRef.close();
    }

    private setDarkModeToggleValue():void {
      this.darkModeValue = this.darkModeService.getDarkMode();
    }

    public handleOnSelectChange(val: any): void {
      const sortOption: SortOption = this.brewSortoptions.find(option => option.value === val);
      this.data.sortOption = sortOption;
    }
}
