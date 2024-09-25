import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingListService {
  // private _ingredients: Ingredient[] = [
  //   new Ingredient('Sobolan', 1),
  //   new Ingredient('Chilli', 100),
  //   new Ingredient('Tomatoes', 10),
  // ];

  private _ingredients: Ingredient[] = [];

  startedEditing = new Subject<number>();
  ingredientAdded = new Subject<Ingredient>();

  get ingredients(): Ingredient[] {
    return this._ingredients.slice();
  }

  set ingredients(value: Ingredient[]) {
    this._ingredients = value;
    this.ingredientAdded.next(null);
  }

  addIngredient(ingredient: Ingredient) {
    this._ingredients.push(ingredient);
    this.ingredientAdded.next(ingredient);
  }

  addIngredients(ingredients: Ingredient[]) {
    this._ingredients.push(...ingredients);
    this.ingredientAdded.next(null);
  }

  deleteIngredient(id: number) {
    this._ingredients.splice(id, 1);
    this.ingredientAdded.next(null);
  }

  editIngredient(id: number, ingredient: Ingredient) {
    this._ingredients[id] = ingredient;
    this.ingredientAdded.next(null);
  }

  getIngredientById(id: number) {
    return this.ingredients[id];
  }
}
