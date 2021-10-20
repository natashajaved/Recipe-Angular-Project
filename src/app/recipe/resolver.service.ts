import { RecipeService } from './recipe.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {

    constructor(private dataStorage: DataStorageService, private recipeService:RecipeService) { 

    }
    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
        const recipes=this.recipeService.getRecipes()
        if(recipes.length){
            return recipes
        }
        return this.dataStorage.fetchRecipes()
    }
}