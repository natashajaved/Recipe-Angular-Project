import { ShoppingListService } from './shopping-list.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[]
  subscription: Subscription
  constructor(private shoppingListService: ShoppingListService) {

  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients()
    this.subscription = this.shoppingListService.ingredientAdded.subscribe((ings) => {
      this.ingredients = ings
    })
  }
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
  onItemSelected(i:number){
    this.shoppingListService.startedEditing.next(i)
  }

}
