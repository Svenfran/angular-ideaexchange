import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCbChecked]'
})
export class CbCheckedDirective {
  
  constructor(private renderer: Renderer2, private el: ElementRef) { }

  @HostListener('change') 
  toggleClass() {
    let className = this.el.nativeElement.className; 

    if (!className.includes('cb-checked')) {
      this.renderer.addClass(this.el.nativeElement, 'cb-checked');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'cb-checked');
    }
  }

 

}
