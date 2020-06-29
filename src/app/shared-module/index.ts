import { RangeInputComponent } from "./components/range-input/range-input.component";
import { HorizontalSliderComponent } from "./components/horizontal-slider/horizontal-slider.component";
import { ShortNumberPipe } from "./pipes/short-number.pipe";
import { OnlyNumbers } from "./directives/only-numbers.directive";


export const SHARED_MODULE_DECLARATIONS = [
  // components
  RangeInputComponent, 
  HorizontalSliderComponent,
  // directives
  OnlyNumbers,
  // pipes
  ShortNumberPipe
];