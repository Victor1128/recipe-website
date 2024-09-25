import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  public id: number;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  constructor(
    name: string,
    description: string,
    imagePath: string,
    ingredients?: Ingredient[],
    id?: number,
  ) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients ? ingredients : [];
    this.id = id ? id : null;
  }
}
