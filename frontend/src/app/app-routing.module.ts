import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchFormComponent } from './search-form/search-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: 'search', component: SearchFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
