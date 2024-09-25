import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.scss',
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', { static: false }) form: NgForm;
  errors = [];
  private subscription: Subscription;
  editMode = false;
  editedItemId: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (id: number) => {
        this.editMode = true;
        this.editedItemId = id;
        this.editedItem = this.shoppingListService.getIngredientById(id);
        this.form.setValue({
          ...this.editedItem,
        });
      },
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  validate() {
    const data = this.form.value;
    console.log(data);
    if (!data.name || (!data.amount && data.amount !== 0))
      this.errors.push('All fields are required!');
    if (data.amount !== '' && data.amount <= 0)
      this.errors.push('Amount must me greater than 0!');
    return this.errors.length === 0;
  }

  updateIngredient() {
    this.errors = [];
    if (!this.validate()) return;
    const data = this.form.value;
    this.shoppingListService.editIngredient(
      this.editedItemId,
      new Ingredient(data.name, data.amount),
    );
    this.clearForm();
    this.editMode = false;
  }

  onDelete() {
    if (!this.editMode) return;
    this.shoppingListService.deleteIngredient(this.editedItemId);
    this.editMode = false;
    this.clearForm();
  }

  clearForm() {
    this.form.reset();
    this.editMode = false;
  }

  onSubmit() {
    this.editMode ? this.updateIngredient() : this.addIngredient();
  }

  addIngredient() {
    this.errors = [];
    if (!this.validate()) return;
    const data = this.form.value;
    this.shoppingListService.addIngredient(
      new Ingredient(data.name, data.amount),
    );
    this.clearForm();
  }
}
