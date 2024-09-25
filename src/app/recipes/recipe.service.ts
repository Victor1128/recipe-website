import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter, Injectable } from '@angular/core';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  public ingredientsAdded = new Subject<Ingredient[]>();

  recipesChanged = new Subject<Recipe[]>();

  // private _recipes: Recipe[] = [
  //   new Recipe(
  //     'Ciorba cu sobolan',
  //     'Poate contine urme de ciorba',
  //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReAkw-8Z77hddVqLuI5SmDR3FulAApwY113g&s',
  //     [new Ingredient('ciorba', 1), new Ingredient('sobolan', 10)],
  //   ),
  //   new Recipe(
  //     'Taieteii criminali',
  //     'Te ustura curu cand termini',
  //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR54yBifKIeF1Tg4biXQhc3j-8-S1Ojl4SGQ&s',
  //     [
  //       new Ingredient('taietei la plic', 2),
  //       new Ingredient('Piper', 3),
  //       new Ingredient('Chilli', 10),
  //     ],
  //   ),
  //   new Recipe(
  //     'Inghetata de nebuni',
  //     'Cand mananci iti ingheata sufletul',
  //     'https://img.sndimg.com/food/image/upload/q_92,fl_progressive,w_1200,c_scale/v1/img/recipes/22/09/09/9P0TT20cS8qeKKKA9HxU_DSC05715-2.jpg',
  //     [
  //       new Ingredient('inghetata de vanilie', 1),
  //       new Ingredient('ulei de masline', 2),
  //       new Ingredient('sare', 4),
  //     ],
  //   ),
  // ];

  private _recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) {
    this._recipes = this.recipes.map((recipe, index) => {
      recipe.id = index;
      return recipe;
    });

    this.ingredientsAdded.subscribe((ingredients) => {
      this.shoppingListService.addIngredients(ingredients);
    });
  }

  get recipes(): Recipe[] {
    return this._recipes.slice();
  }

  set recipes(value: Recipe[]) {
    this._recipes = value;
    this.recipesChanged.next(this.recipes);
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    recipe.id = this.recipes.length;
    this._recipes.push(recipe);
    this.recipesChanged.next(this.recipes);
  }

  updateRecipe(id: number, recipe: Recipe) {
    console.log(recipe);
    recipe.id = id;
    this._recipes[id] = recipe;
    this.recipesChanged.next(this.recipes);
  }

  deleteRecipe(id: number) {
    this._recipes.splice(id, 1);
    this._recipes = this.recipes.map((recipe, index) => {
      recipe.id = index;
      return recipe;
    });
    this.recipesChanged.next(this.recipes);
  }
}
