import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  @Input() messages: string[];
  @Output() closed = new EventEmitter<void>();

  onClose() {
    this.closed.emit();
  }
}
