import { Component, AfterViewInit, ElementRef } from '@angular/core';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

hljs.registerLanguage('javascript', javascript);

@Component({
  selector: 'app-highlight',
  template: '<pre><code [innerHTML]="codeSnippet"></code></pre>',
})
export class HighlightComponent implements AfterViewInit {
  codeSnippet = `// Your code snippet goes here`;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    hljs.highlightBlock(this.el.nativeElement.querySelector('code'));
  }
}

