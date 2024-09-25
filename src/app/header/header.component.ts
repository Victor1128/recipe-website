import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;
  isAuthenticated = false;

  constructor(
    private dataStorageService: DataStorageService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onSave() {
    if (this.router.url.includes('shopping-list'))
      this.dataStorageService.storeIngredients();
    if (this.router.url.includes('recipes'))
      this.dataStorageService.storeRecipes();
  }

  onFetch() {
    if (this.router.url.includes('recipes'))
      this.dataStorageService.getRecipes().subscribe();
    if (this.router.url.includes('shopping-list'))
      this.dataStorageService.getIngredients().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
