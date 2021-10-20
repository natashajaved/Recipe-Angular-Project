import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    public ingredientAdded = new Subject<Ingredient[]>()
    public startedEditing = new Subject<number>()
    private ingredients: Ingredient[] = [{ name: 'Apples', amount: 2 }, { name: 'Banana', amount: 7 }]

    getIngredient(index) {
        return this.ingredients[index]
    }
    getIngredients() {
        return [...this.ingredients]
    }
    addIngredient(ing) {
        this.ingredients.push(ing)
        this.ingredientAdded.next([...this.ingredients])
    }
    addMultipleIngredients(ings) {
        this.ingredients = this.ingredients.concat(ings)
        this.ingredientAdded.next([...this.ingredients])
    }
    updateIngredient(index, ing: Ingredient) {
        this.ingredients[index] = ing
        this.ingredientAdded.next([...this.ingredients])
    }
    deleteIngredient(index) {
        this.ingredients.splice(index, 1)
        this.ingredientAdded.next([...this.ingredients])

    }
}