import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss',
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      this.recipe = this.recipeService.getRecipe(+params['id']);
    });
  }

  onAddIngredients() {
    this.recipeService.ingredientsAdded.next(this.recipe.ingredients);
    this.router.navigate(['/shopping-list']);
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipe.id);
    this.router.navigate(['/recipes']);
  }
}
