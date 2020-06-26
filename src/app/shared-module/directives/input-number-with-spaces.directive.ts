import { Directive, OnInit, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: "[formControlName][appNumberWithSpaces]"
})
export class InputNumberWithSpaces implements OnInit, OnDestroy {
  private readonly ngUnsubscribe$ = new Subject<void>();

  constructor(public ngControl: NgControl) {}

   ngOnInit(): void {
     debugger;
    this.ngControl.control.valueChanges.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(
      value => {
        const newVal = this.transform(value);
        this.ngControl.control.setValue(newVal, { emitEvent: false });
      }
    );
  }

  transform(x) {
    debugger;
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
