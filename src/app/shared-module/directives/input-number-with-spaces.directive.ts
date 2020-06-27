import { Directive, HostListener, ElementRef } from "@angular/core";

@Directive({
  selector: "[formControl][appNumberWithSpaces]"
})
export class InputNumberWithSpaces {
  
  @HostListener("input", ["$event.target.value"])
  onInput(value: string) {
    this.elementReference.nativeElement.value = this.transform(value)
  }

  constructor(private elementReference: ElementRef) {}

  transform(value: string) {

    const valueWithoutSpaces = value.replace(/\s/g, "");

    return Number(valueWithoutSpaces).toLocaleString("fi-FI");
  }
}
