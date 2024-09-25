import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  MaybeAsync,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): MaybeAsync<any> {
    return this.recipeService.recipes.length !== 0
      ? this.recipeService.recipes
      : this.dataStorageService.getRecipes();
  }
}
