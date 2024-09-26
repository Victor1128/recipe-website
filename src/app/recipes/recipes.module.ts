import { NgModule } from '@angular/core';
import { RecipeComponent } from './recipe.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';

@NgModule({
  declarations: [
    RecipeComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeStartComponent,
    RecipeEditComponent,
    RecipeItemComponent,
  ],
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  exports: [
    RecipeComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeStartComponent,
    RecipeEditComponent,
    RecipeItemComponent,
  ],
})
export class RecipesModule {}
