import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthComponent } from './auth/auth.component';


const routes: Routes = [
  {
    path: "", redirectTo: "/recipes", pathMatch: 'full'
  },
  {
    path: "recipes", loadChildren: () => {
      return import('./recipe/recipe.module').then(m => m.RecipeModule)

    },
    // use this in a custom loader, where we can check this property in route
    data: { preload: true }
  },
  {
    path: "auth", loadChildren: () => {
      return import('./auth/auth.module').then(m => m.AuthModule)
    },
  },
  {
    path: "shopping-list", loadChildren: () => {
      return import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
    },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
