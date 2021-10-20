import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipe: Recipe
  id: number
  editMode = false
  form: FormGroup
  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) {

  }
  private initForm() {
    let name = ""
    let image = ""
    let description = ""
    let ings = new FormArray([])
    console.log(this.editMode, this.id)
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(+this.id)
      name = recipe.name
      image = recipe.imagePath
      description = recipe.description
      for (let ingredient of recipe.ingredients) {
        ings.push(new FormGroup({
          'name': new FormControl(ingredient.name, Validators.required),
          'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        }))
      }
    }

    this.form = new FormGroup({
      'name': new FormControl(name),
      'image': new FormControl(image),
      'description': new FormControl(description),
      'ingredients': ings
    })
    console.log(this.form)
  }

  getControls() {
    return (<FormArray>this.form.get('ingredients')).controls
  }

  onAddIng() {
    console.log("new ing");
    (<FormArray>this.form.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }))
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.id = +params.id
        this.editMode = true
      } else {
        this.editMode = false
      }
      this.initForm()

    })
  }
  addIng() {

  }
  onSubmit() {


    console.log(this.form.value, 'submitted')
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, new Recipe(this.id, this.form.value['name'], this.form.value['description'], this.form.value['image'], this.form.value['ingredients']))
    } else {
      this.recipeService.addRecipe(new Recipe(this.recipeService.getRecipes().length + 1, this.form.value['name'], this.form.value['description'], this.form.value['image'], this.form.value['ingredients']))
    }
    this.navigateToRecipes()

  }

  private navigateToRecipes() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  onCancel() {
    this.navigateToRecipes()
  }

  deleteIng(index) {
    (<FormArray>this.form.get('ingredients')).removeAt(index)

  }
}
