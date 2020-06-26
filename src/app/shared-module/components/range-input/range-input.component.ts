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
    debugger;

    this._value = val;
    this.onChange(val);
  }
  get value() {
    debugger;
    return this._value;
  }  

  private readonly ngUnsubscribe$ = new Subject<void>();

  formGroup: FormGroup;

  protected _value: any;
  disabled: boolean;
  control: FormControl;  

  handlerLeftPercentageMargin: number;

  onChange = (_: any) => {debugger};
  onTouch = (_: any) => {debugger};

  constructor(
    @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer
  ) {}

  ngOnInit() {
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

    this.formGroup.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => {
        this.handlerLeftPercentageMargin = this.getPercentageOffsetFromLeftByValue(this.control.value);
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  onChangeEvent($event: Event) {
    debugger;
    this.writeValue(($event.target as HTMLInputElement).value);
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this._value = value;
      debugger;
      
      this.onChange(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  getPercentageOffsetFromLeftByValue(tick: number) {
    if (tick <= this.min) {
      return 0;
    }

    if(tick >= this.max) {
      return 100;
    }

    const rangeBetweenMaxAndMin = this.max - this.min;
    const valueOnOnePercent = rangeBetweenMaxAndMin / 100;
    const moreThanMinOn = tick - this.min;

    return (moreThanMinOn / rangeBetweenMaxAndMin) * 100;
  }

   transform(valueBeforeTransform: string) {
    if (!valueBeforeTransform.toString()) {
      return "";
    }

    const valueAsStringValue = valueBeforeTransform.toString();
  
    const valueWithoutSpaces = valueAsStringValue.replace(" ", "")

    return valueWithoutSpaces.replace(/(?!^)(?=(?:\d{3})+$)/g, " ");
  }

  setControlValue(value: number) {
    debugger;
    this.control.setValue(value);
  }
}
