import { Directive, HostListener, ElementRef } from "@angular/core";

@Directive({
  selector: "[formControl][appNumberWithSpaces]"
})
export class InputNumberWithSpaces {
  @HostListener("keyup", ["$event.target.value"])
  onInput(value: string) {
    this.elementReference.nativeElement.value = this.transform(value);
  }

  constructor(private elementReference: ElementRef) {}

  transform(valueBeforeTransform: string) {
    const valueWithoutSpaces = valueBeforeTransform.replace(/\s/g, "");

    return Number(valueWithoutSpaces).toLocaleString("ru");
  }
}
