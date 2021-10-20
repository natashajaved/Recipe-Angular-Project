import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {

  recipe: Recipe
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.recipe = this.recipeService.getRecipe(+params.id)
    })
  }

  moveToShoppingList(ings) {
    this.recipeService.addIngredientsToList(ings)
  }

  onEditClick() {
    this.router.navigate(["edit"], { relativeTo: this.route })
  }
  deleteRecipe(id: number) {
    this.recipeService.deleteRecipe(id)
    this.router.navigate(['../'],{ relativeTo: this.route })
  }

}
