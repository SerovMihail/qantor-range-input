import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: 'input[type=text][appUpperCase]',
    host: {
        '(input)': 'ref.nativeElement.value=$event.target.value.toUpperCase()',
    }

})
export class UpperCaseText {
    constructor(private ref: ElementRef) {
    }
}