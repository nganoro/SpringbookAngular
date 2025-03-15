import { Routes } from '@angular/router';
import { RestaurantListingComponent } from './restaurant-listing/restaurant-listing.component';
import { FoodCatalogueComponent } from './food-catalogue/food-catalogue.component';

export const routes: Routes = [
    { path: '', redirectTo: 'restaurant-listing', pathMatch: 'full', },
    { path: 'restaurant-listing', component: RestaurantListingComponent },
    // { path: 'food-catalogue/:id', loadComponent: () => import('./food-catalogue/food-catalogue.component').then(m => m.FoodCatalogueComponent) }
    { path: 'food-catalogue/:id', component: FoodCatalogueComponent }
];