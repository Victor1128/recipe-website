import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.scss',
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.editMode = params['id'] != null;
      if (this.editMode)
        this.recipe = this.recipeService.getRecipe(+params['id']);
      else this.recipe = new Recipe('', '', '');
      this.initForm();
    });
  }

  private initForm() {
    this.recipeForm = new FormGroup({
      name: new FormControl(this.recipe.name, Validators.required),
      imagePath: new FormControl(this.recipe.imagePath, Validators.required),
      description: new FormControl(
        this.recipe.description,
        Validators.required,
      ),
      ingredients: new FormArray(
        this.recipe.ingredients.map(
          (ingredient) =>
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            }),
        ),
      ),
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    console.log(this.recipeForm.value);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.recipe.id, this.recipeForm.value);
    } else this.recipeService.addRecipe(this.recipeForm.value);
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      }),
    );
  }

  onRemoveIngredient(id: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(id);
  }
}
