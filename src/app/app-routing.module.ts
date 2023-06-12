import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

<<<<<<< HEAD
let routes: Routes;
routes = [
=======
const routes: Routes = [
>>>>>>> de0472b54fd71bc62e53825a043dca3bee9e2636
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'detailsCoin',
<<<<<<< HEAD
    loadChildren: () => import('./tab1-details/tab1-details.module').then(m => m.Tab1DetailsPageModule)
  },
  {
    path: 'stats',
    loadChildren: () => import('./tab1/stats.module').then(m => m.StatsPageModule)
  },
  {
    path: 'stats/:id',
    loadChildren: () => import('./tab1/stats.module').then(m => m.StatsPageModule)
  }
];

=======
    loadChildren: () => import('./tab2/tab2.module').then(m => m.Tab2PageModule)
  }

];
>>>>>>> de0472b54fd71bc62e53825a043dca3bee9e2636
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
