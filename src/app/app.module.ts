import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { RangeInputComponent } from './components/range-input/range-input.component';
import { ShortNumberPipe } from './components/range-input/short-number.pipe';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule ],
  declarations: [ AppComponent, HelloComponent, RangeInputComponent, ShortNumberPipe ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
