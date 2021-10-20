import { AuthService } from './../auth/auth.service';
import { Recipe } from './../recipe/recipe.model';
import { RecipeService } from './../recipe/recipe.service';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from 'rxjs/operators'
@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {

    }
    storeRecipes() {
        const recipes = this.recipeService.getRecipes()
        this.http.put('https://angular-project-b39f9-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe((data) => {
            console.log({ data })
        })
    }

    fetchRecipes() {
        return this.http.get('https://angular-project-b39f9-default-rtdb.firebaseio.com/recipes.json').pipe(map((data: Recipe[]) => {
            return data.map((recipe) => ({ ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }))
        }), tap((data) => { this.recipeService.storeRecipes(data) })
        )
    }
}