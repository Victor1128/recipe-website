import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss',
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipes = this.recipeService.recipes;
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => (this.recipes = recipes),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
