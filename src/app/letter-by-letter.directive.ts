import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[letterByLetter]'
})
export class LetterByLetterDirective {
  @Input('letterByLetter') set text(value: string) {
    this.animateText(value);

  }
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  private animateText(text: string) {
    this.el.nativeElement.textContent = '';
    for (let i = 0; i < text.length; ++i) {
        setTimeout(() => {
          this.renderer.appendChild(this.el.nativeElement, this.renderer.createText(text[i]));
        }, i * 15);
    }
  }















}
