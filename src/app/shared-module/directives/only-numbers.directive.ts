import { Directive, HostListener, ElementRef } from "@angular/core";

@Directive({
  selector: "[onlyNumbers]"
})
export class OnlyNumbers {
  
  @HostListener("input", ["$event.target.value"])
  onInput(value: string) {
    this.elementReference.nativeElement.value = this.transform(value)
  }

  constructor(private elementReference: ElementRef) {}

  transform(value: string) {

    return value.replace(/[^\dA-Z]/g, '');

  }
}
