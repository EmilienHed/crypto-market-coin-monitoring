import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

let routes: Routes;
routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'detailsCoin',
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

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
