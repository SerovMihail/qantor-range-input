import { RangeInputComponent } from "./range-input/range-input.component";
import { ShortNumberPipe } from "../pipes/short-number.pipe";
import { HorizontalSliderComponent } from "./horizontal-slider/horizontal-slider.component";
import { InputNumberWithSpaces } from "../directives/input-number-with-spaces.directive";

export const SHARED_MODULE_DECLARATIONS = [
  // components
  RangeInputComponent, 
  HorizontalSliderComponent,
  // directives
  InputNumberWithSpaces,
  // pipes
  ShortNumberPipe
];