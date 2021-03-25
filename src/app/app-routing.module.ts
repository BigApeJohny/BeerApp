import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrewPageComponent} from './pages/brew-page/brew-page.component'

const routes: Routes = [
  { path: 'brew-page', component: BrewPageComponent },
  { path: '',   redirectTo: '/brew-page', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
