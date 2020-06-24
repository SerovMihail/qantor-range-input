import { Component, OnInit, Input, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR, ControlValueAccessor, AbstractControl } from "@angular/forms";


@Component({
  selector: 'app-range-input',
  templateUrl: './range-input.component.html',
  styleUrls: ['./range-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RangeInputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RangeInputComponent implements OnInit, ControlValueAccessor {

  @Input() min: number;
  @Input() max: number;
  @Input() ticks: number[] = [];

  @Input()
  set value(val) {
    this._value = val;
    this.onChange(val);
  }
  get value() {
    return this._value;
  }
  protected _value: any;
    disabled: boolean;
      control: AbstractControl;



  onChange = (_: any) => {};
  onTouch = (_: any) => {};

  constructor() { }

  ngOnInit() {
  }

  onChangeEvent($event: Event) {
    this.writeValue(($event.target as HTMLInputElement).value);
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this._value = value;
      this.onChange(this.value);
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
  getTickWidthByTick(tick: number) {
    return 
  }

}