// initials-icon.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-initials-icon',
  template: `
    <div class="initials-icon" [ngStyle]="getIconStyles()">
      {{ initials }}
    </div>
  `,
  styleUrls: ['./initials-icon.component.css'],
})
export class InitialsIconComponent {
  @Input() firstName: string = '';
  @Input() lastName: string = '';
  @Input() size: string = '40px'; // Default size

  get initials(): string {
    return `${this.firstName.charAt(0)}${this.lastName.charAt(0)}`;
  }

  getIconStyles(): any {
    const fontSize = `${(1 / 2) * parseInt(this.size)}px`;

    return {
      width: this.size,
      height: this.size,
      borderRadius: '50%',
      backgroundColor: '#007bff', // Customize the background color as needed
      color: '#ffffff', // Customize the text color as needed
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: fontSize, // Adjust font size based on the provided size
    };
  }
}
