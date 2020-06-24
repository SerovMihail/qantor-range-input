import { Component, VERSION } from "@angular/core";
import { IRangeInputConfig } from "./components/range-input/IRangeInputConfig";

import { FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {

  rangeInputConfig: IRangeInputConfig = {
    min: 50,
    max: 100,
    ticks: [0, 50, 75, 100]
  };

  form = new FormGroup({
    salary: new FormControl(0)
  });

  submit() {
    alert(`value in salary control = ${this.salaryControl.value}`)
  }

  get salaryControl() {
    if (!this.form) {
      return;
    }

    return this.form.get("salary");
  }
}
