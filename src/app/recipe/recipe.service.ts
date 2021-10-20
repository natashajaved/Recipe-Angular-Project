import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {

    private recipes: Recipe[] =[]
        // [new Recipe(1, "Pasta",
        //     "This is the recipe for pasta",
        //     "https://images.pexels.com/photos/1526/dark-blur-blurred-gradient.jpg?auto=compress&cs=tinysrgb&h=750&w=1260",
        //     [new Ingredient('Meat', 1), new Ingredient('Potatoes', 3)]
        // ),
        // new Recipe(2, "Chowmein",
        //     "This is the recipe for chowmien",
        //     "https://images.pexels.com/photos/1526/dark-blur-blurred-gradient.jpg?auto=compress&cs=tinysrgb&h=750&w=1260",
        //     [new Ingredient('Onions', 1), new Ingredient('chicken', 1)])]

    recipeCHanged = new Subject<Recipe[]>()
    constructor(private shoppingListService: ShoppingListService) {

    }
    getRecipes() {
        return [...this.recipes]
    }

    storeRecipes(recipes: Recipe[]) {
        // can test this by deleting recipes from front end, and then fetch and see
        this.recipes = recipes
        this.recipeCHanged.next([...this.recipes])
    }

    getRecipe(id: number) {
        return this.recipes.find(recipe => recipe.id === id)
    }

    addIngredientsToList(ings) {
        this.shoppingListService.addMultipleIngredients(ings)

    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe)
        this.recipeCHanged.next([...this.recipes])


    }
    updateRecipe(id: number, recipe: Recipe) {
        this.recipes = this.recipes.map((rec) => {
            if (rec.id === id) {
                return recipe
            }
            return rec
        })
        console.log(this.recipes, id)
        this.recipeCHanged.next([...this.recipes])
    }
    deleteRecipe(id: number) {
        this.recipes = this.recipes.filter((rec) => rec.id !== id)
        this.recipeCHanged.next([...this.recipes])
    }
}