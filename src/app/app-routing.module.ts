import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthPageModule),
  },
  {
    path: 'places',
    canMatch: [AuthGuard],
    loadChildren: () =>
      import('./places/places.module').then((m) => m.PlacesPageModule),
  },
  {
    path: 'bookings',
    canMatch: [AuthGuard],
    loadChildren: () =>
      import('./bookings/bookings.module').then((m) => m.BookingsPageModule),
  },
  {
    path: '**',
    redirectTo: 'places/discover',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
