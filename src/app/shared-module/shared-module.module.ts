import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SHARED_MODULE_DECLARATIONS } from ".";

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [...SHARED_MODULE_DECLARATIONS, ],
  exports: [...SHARED_MODULE_DECLARATIONS]
})
export class SharedModuleModule {}
