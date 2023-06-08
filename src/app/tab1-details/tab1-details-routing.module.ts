import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab1DetailsPage } from './tab1-details.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1DetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab1DetailsPageRoutingModule {}
