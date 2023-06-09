import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1DetailsPageRoutingModule } from './tab1-details-routing.module';

import { Tab1DetailsPage } from './tab1-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    Tab1DetailsPageRoutingModule
  ],
  declarations: [Tab1DetailsPage]
})
export class Tab1DetailsPageModule {}
