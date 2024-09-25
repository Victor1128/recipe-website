import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {
    this.subscription = this.shoppingListService.ingredientAdded.subscribe(
      (ingredient) => this.refreshIngredients(),
    );
  }

  ngOnInit() {
    this.refreshIngredients();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  refreshIngredients() {
    this.ingredients = this.shoppingListService.ingredients;
  }

  onEditItem(id: number) {
    this.shoppingListService.startedEditing.next(id);
  }
}
