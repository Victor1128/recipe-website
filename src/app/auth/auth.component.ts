import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  @ViewChild('authForm', { static: false }) form: NgForm;
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost;

  showPassword = false;
  showPassword2 = false;
  isLoginMode = true;
  isLoading = false;
  errors: string[] = [];

  private closeSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {}

  onChangeShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onChangeShowPassword2() {
    this.showPassword2 = !this.showPassword2;
  }

  onChangeMode() {
    this.isLoginMode = !this.isLoginMode;
    this.form.reset();
  }

  onSubmit() {
    if (!this.form.valid) return;
    const email = this.form.value.email;
    const password = this.form.value.password;

    this.isLoading = true;

    let authObservable: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObservable = this.authService.logIn(email, password);
    } else {
      const password2 = this.form.value.password2;
      if (password2 != password) {
        this.errors.push('The passwords do not match!');
        this.isLoading = false;
        return;
      }
      authObservable = this.authService.signUp(email, password);
    }

    authObservable.subscribe(
      (responseData) => {
        console.log(responseData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (error) => {
        this.errors.push(error);
        this.showErrorAlert([error]);
        this.isLoading = false;
      },
    );

    this.form.reset();
  }

  onFormTouch() {
    this.errors = [];
  }

  onHandleClose() {
    this.errors = [];
  }

  private showErrorAlert(errors: string[]) {
    const alertComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainer = this.alertHost.viewContainerRef;
    hostViewContainer.clear();
    const component = hostViewContainer.createComponent(alertComponentFactory);
    component.instance.messages = errors;
    this.closeSubscription = component.instance.closed.subscribe(() => {
      this.closeSubscription.unsubscribe();
      this.errors = [];
      hostViewContainer.clear();
    });
  }
}
