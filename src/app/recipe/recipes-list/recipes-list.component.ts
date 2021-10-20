import { DataStorageService } from './../../shared/data-storage.service';
import { RecipeService } from './../recipe.service';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {

  // @Output() recipeWasSelected = new EventEmitter()
  recipes: Recipe[]
  sub: Subscription


  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute, private dataStorage: DataStorageService) { }
  ngOnInit(): void {
    //this.dataStorage.fetchRecipes().subscribe()
    this.recipes= this.recipeService.getRecipes()
    this.sub = this.recipeService.recipeCHanged.subscribe((data) => {
      console.log("change sub")
      this.recipes = data
    })

  }
  // onRecipeSelected(recipe: Recipe) {
  //   this.recipeWasSelected.emit(recipe)
  // }

  onAddClick() {
    this.router.navigate(["new"], { relativeTo: this.route })
  }
  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}
