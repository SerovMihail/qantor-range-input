import { Directive, HostListener, ElementRef } from "@angular/core";

@Directive({
  selector: "[formControl][appNumberWithSpaces]"
})
export class InputNumberWithSpaces {
  
  @HostListener("input", ["$event.target"])
  onInput(elementTarget: HTMLInputElement) {
    debugger;
    this.elementReference.nativeElement.value = this.transform(elementTarget);
  }

  constructor(private elementReference: ElementRef) {}

  transform(elementTarget: HTMLInputElement) {

    const valueWithoutSpaces = elementTarget.value.replace(/\s/g, "");

    return valueWithoutSpaces.replace(/[^\dA-Z]/g, '').replace(/(.{3})/g, '$1 ').trim();;
  }
}
