import { RangeInputComponent } from "./components/range-input/range-input.component";
import { HorizontalSliderComponent } from "./components/horizontal-slider/horizontal-slider.component";
import { InputNumberWithSpaces } from "./directives/input-number-with-spaces.directive";
import { ShortNumberPipe } from "./pipes/short-number.pipe";
import { UpperCaseText } from "./directives/uppercase.directive";


export const SHARED_MODULE_DECLARATIONS = [
  // components
  RangeInputComponent, 
  HorizontalSliderComponent,
  // directives
  InputNumberWithSpaces,
  UpperCaseText,
  // pipes
  ShortNumberPipe
];