import {
  Component,
  OnInit,
  Input,
  forwardRef,
  ChangeDetectionStrategy,
  Optional,
  Host,
  SkipSelf,
  OnDestroy
} from "@angular/core";
import {
  ControlContainer,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  AbstractControl,
  FormGroup,
  FormControl
} from "@angular/forms";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { ISliderDragFinish } from "../../models/emitters/ISliderDragFinish";

@Component({
  selector: "app-range-input",
  templateUrl: "./range-input.component.html",
  styleUrls: ["./range-input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RangeInputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RangeInputComponent
  implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() min: number;
  @Input() max: number;
  @Input() ticks: number[];

  @Input() formControlName: string;

  @Input()
  set value(val) {
    this._value = val;
    this.onChange(val);
  }
  get value() {
    return this._value;
  }
  private _value: any;

  private readonly ngUnsubscribe$ = new Subject<void>();

  formGroup: FormGroup;
  control: FormControl;

  handlerLeftOffset: number;

  onChange = (_: any) => {};
  onTouch = (_: any) => {};

  constructor(
    @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer
  ) {}

  ngOnInit() {
    this.getFormGroupAndFormControl();
    this.observeFormGroupValueChanges();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  private getFormGroupAndFormControl() {
    if (this.controlContainer) {
      if (this.formControlName) {
        this.formGroup = this.controlContainer.control as FormGroup;
        this.control = this.controlContainer.control.get(
          this.formControlName
        ) as FormControl;
      } else {
        console.warn(
          "Missing FormControlName directive from host element of the component"
        );
      }
    } else {
      console.warn("Can't find parent FormGroup directive");
    }
  }

  private observeFormGroupValueChanges() {
    this.formGroup.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => {
        this.handlerLeftOffset = this.getPercentageOffsetFromLeftByValue(
          this.control.value
        );
      });
  }

  onChangeEvent($event: Event) {
    this.writeValue(($event.target as HTMLInputElement).value);
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this._value = value;
      this.onChange(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  getPercentageOffsetFromLeftByValue(tick: number) {
    if (tick <= this.min) {
      return 0;
    }

    if (tick >= this.max) {
      return 100;
    }

    const rangeBetweenMaxAndMin = this.max - this.min;
    const valueOnOnePercent = rangeBetweenMaxAndMin / 100;
    const moreThanMinOn = tick - this.min;

    return (moreThanMinOn / rangeBetweenMaxAndMin) * 100;
  }

  onSliderDragEmit(value: number) {
    this.setControlValue(value);
    this.handlerLeftOffset = this.getPercentageOffsetFromLeftByValue(
      value
    );
  }

  private transform(valueBeforeTransform: string) {
    if (!valueBeforeTransform.toString()) {
      return "";
    }

    const valueAsStringValue = valueBeforeTransform.toString();

    const valueWithoutSpaces = valueAsStringValue.replace(" ", "");

    return valueWithoutSpaces.replace(/(?!^)(?=(?:\d{3})+$)/g, " ");
  }

  

  setControlValue(value: number) {
    this.control.setValue(value);
  }
}
