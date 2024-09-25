import {ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot} from "@angular/router";
import {DataStorageService} from "../shared/data-storage.service";
import {Injectable} from "@angular/core";
import {ShoppingListService} from "./shopping-list.service";


@Injectable({providedIn: "root"})
export class ShoppingListResolverService implements Resolve<any> {
  constructor(private dataStorageService: DataStorageService, private shoppingListService: ShoppingListService) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): MaybeAsync<any> {
    return this.shoppingListService.ingredients.length !== 0 ?
      this.shoppingListService.ingredients :
      this.dataStorageService.getIngredients()

  }
}
