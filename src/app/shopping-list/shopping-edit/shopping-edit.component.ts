import { Subscription } from 'rxjs';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  // @ViewChild('nameInput') nameRef: ElementRef;
  // @ViewChild('amountInput') amountRef: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>()
  @ViewChild('f') form: NgForm
  sub: Subscription
  editMode = false
  editedItem: number
  selectedIng: Ingredient
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.sub = this.shoppingListService.startedEditing.subscribe((data) => {
      this.editMode = true
      this.editedItem = data
      this.selectedIng = this.shoppingListService.getIngredient(data)
      this.form.setValue({
        name: this.selectedIng.name,
        amount: this.selectedIng.amount
      })
    })
  }

  onSubmit(form) {
    // const name = this.nameRef.nativeElement.value
    // const amount = this.amountRef.nativeElement.value
    // const ing = new Ingredient(name, amount)
    const ing = form.value
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItem, ing)

    } else {
      this.shoppingListService.addIngredient(ing)
    }
    this.onClear()


  }

  onClear() {
    if (this.editMode) {
      this.editMode = false
    }
    this.form.reset()
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItem)
    this.onClear()
  }
}
