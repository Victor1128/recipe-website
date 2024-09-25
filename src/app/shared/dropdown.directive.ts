import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective implements OnInit {
  private _hasClass = false;

  private nameOfClass = 'show';
  @Input() childSelector = '.dropdown-menu';
  @Input() buttonSelector = '.dropdown-toggle';
  private childToAddClass: ElementRef;
  private buttonClickListener;
  private documentClicked;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {}

  set hasClass(value: boolean) {
    this._hasClass = value;
    this.updateChild();
  }

  get hasClass() {
    return this._hasClass;
  }

  ngOnInit() {
    this.childToAddClass = this.elementRef.nativeElement.querySelector(
      this.childSelector,
    );
    const buttonElement = this.elementRef.nativeElement.querySelector(
      this.buttonSelector,
    );

    if (buttonElement) {
      // Add a click event listener to the button
      this.buttonClickListener = this.renderer.listen(
        buttonElement,
        'click',
        this.onClick.bind(this),
      );
    }

    this.documentClicked = this.renderer.listen(
      'document',
      'click',
      this.onDocumentClick.bind(this),
    );
  }

  updateChild() {
    if (this.childToAddClass) {
      let f = this.hasClass
        ? this.renderer.addClass
        : this.renderer.removeClass;
      f(this.childToAddClass, this.nameOfClass);
    }
  }

  onClick() {
    this.hasClass = !this.hasClass;
  }

  onDocumentClick(event: Event) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) this.hasClass = false;
  }
}
