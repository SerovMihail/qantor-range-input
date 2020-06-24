import {
  Component,
  OnInit,
  Input,
  forwardRef,
  ChangeDetectionStrategy,
   Optional, Host, SkipSelf
} from "@angular/core";
import {
  ControlContainer,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  AbstractControl,
  FormGroup,
  FormControl
} from "@angular/forms";

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
  ]
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class RangeInputComponent implements OnInit, ControlValueAccessor {
  @Input() min: number;
  @Input() max: number;
  @Input() ticks: number[] = [];

  @Input() formControlName: string;

  @Input()
  set value(val) {
    this._value = val;
    this.onChange(val);
  }
  get value() {
    return this._value;
  }

    formGroup: FormGroup;

  protected _value: any;
  disabled: boolean;
  control: FormControl;

  onChange = (_: any) => {};
  onTouch = (_: any) => {};

  constructor(@Optional() @Host() @SkipSelf() private controlContainer: ControlContainer) {}

  ngOnInit() {
    if (this.controlContainer) {
      if (this.formControlName) {
        this.formGroup = this.controlContainer.control as FormGroup;
        this.control = this.controlContainer.control.get(this.formControlName) as FormControl;
      } else {
        console.warn(
          "Missing FormControlName directive from host element of the component"
        );
      }
    } else {
      console.warn("Can't find parent FormGroup directive");
    }
  }

  onChangeEvent($event: Event) {
    console.log("change event");
    debugger;
    this.writeValue(($event.target as HTMLInputElement).value);
  }

  writeValue(value: any): void {
    debugger;
    if (value !== undefined) {
      
      this._value = value;
      this.onChange(this.value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    debugger;
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    debugger;
    this.disabled = isDisabled;
  }
  getTickWidthByTick(tick: number) {
    return;
  }

  setControlValue(value: number) {
    debugger;
    this.control.setValue(value);
  }
}
