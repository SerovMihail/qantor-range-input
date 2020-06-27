import { Directive, OnInit, OnDestroy } from "@angular/core";
import { NgControl } from "@angular/forms";
import { Subscription, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Directive({
  selector: "[formControl][appNumberWithSpaces]"
})
export class InputNumberWithSpaces implements OnInit, OnDestroy {

  @HostListener("input", ["$event.target.value"])
  onInput(value) {
    console.log(value)

  }
  private readonly ngUnsubscribe$ = new Subject<void>();

  constructor(public ngControl: NgControl) {}

  ngOnInit(): void {
    debugger;
    this.ngControl.control.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(value => {
        const newVal = this.transform(value);
        debugger;
        this.ngControl.control.setValue(newVal, {
          emitEvent: false,
          onlySelf: true
        });
      });
  }

  transform(valueBeforeTransform: string) {
    if (!valueBeforeTransform.toString()) {
      return "";
    }
  
    const valueWithoutSpaces = valueBeforeTransform.replace(" ", "")

    return valueWithoutSpaces.replace(/(?!^)(?=(?:\d{3})+$)/g, " ");
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
