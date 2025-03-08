import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  imports: [CommonModule],
  templateUrl: './alert-modal.component.html',
  styleUrl: './alert-modal.component.css'
})
export class AlertModalComponent {
  @Input() message: string = '';
  @Input() title: string = 'Alert';
  @Input() type: 'success' | 'info' | 'error' = 'info';

  visible: boolean = false;

  open(message: string, title: string = 'Alert', type: 'success' | 'info' | 'error' = 'info') {
    this.message = message;
    this.title = title;
    this.type = type;
    this.visible = true;
  }

  close() {
    this.visible = false;
  }

  onOverlayClick(event: Event) {
    this.close();
  }
}
