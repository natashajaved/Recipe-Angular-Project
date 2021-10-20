import { RecipeService } from './../recipe.service';
import { DataStorageService } from './../../shared/data-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent implements OnInit {

  empty:boolean
  constructor(private recipeService: RecipeService) {
    this.empty = this.recipeService.getRecipes().length === 0
  }

  ngOnInit(): void {
    this.recipeService.recipeCHanged.subscribe((data) => {
      this.empty = data.length ? false : true
    })
  }

}
