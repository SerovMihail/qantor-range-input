import { RangeInputComponent } from "./range-input/range-input.component";
import { ShortNumberPipe } from "../pipes/short-number.pipe";
import { HorizontalSliderComponent } from "./horizontal-slider/horizontal-slider.component";

export const SHARED_MODULE_DECLARATIONS = [
  RangeInputComponent, 
  HorizontalSliderComponent,
  // pipes
  ShortNumberPipe
];