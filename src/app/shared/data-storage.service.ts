import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { map, take, tap } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from './ingredient.model';
import { environment } from '../../environment/environment';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  private url = environment.dataStorageUrl;
  private recipesUrl = this.url + 'recipes.json';
  private ingredientsUrl = this.url + 'ingredients.json';

  constructor(
    private http: HttpClient,
    private recipesService: RecipeService,
    private shoppingListService: ShoppingListService,
  ) {}

  storeIngredients() {
    const ingredients = this.shoppingListService.ingredients;
    this.http.put(this.ingredientsUrl, ingredients).subscribe();
  }

  getIngredients() {
    return this.http.get<Ingredient[]>(this.ingredientsUrl).pipe(
      tap((ingredients) => {
        this.shoppingListService.ingredients = ingredients;
      }),
    );
  }

  storeRecipes() {
    const recipes = this.recipesService.recipes;
    this.http.put(this.recipesUrl, recipes).subscribe((response) => {
      console.log(response);
    });
  }

  getRecipes() {
    return this.http.get<Recipe[]>(this.recipesUrl).pipe(
      map((recipes) =>
        recipes.map((recipe) => {
          recipe.ingredients = recipe.ingredients ? recipe.ingredients : [];
          return recipe;
        }),
      ),
      tap((recipes: Recipe[]) => {
        console.log(recipes);
        this.recipesService.recipes = recipes;
      }),
    );
  }
}
