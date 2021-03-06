import { Component, VERSION } from "@angular/core";

import { FormGroup, Validators, FormControl } from "@angular/forms";
import { IRangeInputConfig } from "./shared-module/models/interfaces/IRangeInputConfig";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {

  rangeInputConfig: IRangeInputConfig = {
    min: 50000,
    max: 100000,
    ticks: [50000, 60000, 70000, 80000, 90000, 100000]
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
