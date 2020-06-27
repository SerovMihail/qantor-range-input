import { RangeInputComponent } from "./components/range-input/range-input.component";
import { HorizontalSliderComponent } from "./components/horizontal-slider/horizontal-slider.component";
import { ShortNumberPipe } from "./pipes/short-number.pipe";
import { OnlyNumbers } from "./directives/input-number-with-spaces.directive";


export const SHARED_MODULE_DECLARATIONS = [
  // componentsOnlyNumbers
  RangeInputComponent, 
  HorizontalSliderComponent,
  // directives
  OnlyNumbers,
  // pipes
  ShortNumberPipe
];