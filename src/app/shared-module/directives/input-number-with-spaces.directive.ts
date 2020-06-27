import { Directive, HostListener, ElementRef } from "@angular/core";

@Directive({
  selector: "[formControl][appNumberWithSpaces]"
})
export class InputNumberWithSpaces {
  @HostListener("keyup", ["$event.target"])
  onInput(elementTarget: HTMLInputElement) {
    let cursorPosition = elementTarget.selectionStart;
    this.elementReference.nativeElement.value = this.transform(elementTarget);
    elementTarget.selectionEnd = ++cursorPosition; 

  }

  constructor(private elementReference: ElementRef) {}

  transform(elementTarget: HTMLInputElement) {

    

    const valueWithoutSpaces = elementTarget.value.replace(/\s/g, "");


    return Number(valueWithoutSpaces).toLocaleString("ru");
  }
}
