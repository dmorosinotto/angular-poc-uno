import { Component, OnInit, Input, forwardRef } from "@angular/core";
import {
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validator,
  ValidationErrors,
  AbstractControl
} from "@angular/forms";
import { BaseCtrl } from "../base/base-ctrl.component";

const IMPLEMENT_VALIDATE_LOGIC = null;

@Component({
  selector: "ui-codfisc",
  template: `
    <label
      >CODICE FISCALE:
      <input type="text" [formControl]="ctrl" />
      {{ ctrl.valid }} {{ ctrl.errors | json }}
    </label>
  `,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => UiCodfiscComponent) },
    { provide: NG_VALIDATORS, multi: true, useExisting: forwardRef(() => UiCodfiscComponent) }
  ],
})
export class UiCodfiscComponent extends BaseCtrl<string> implements Validator {
  constructor() {
    super();
    this.ctrl.setValidators(this.validate);
  }

  modelToView(modelValue: string): string {
    console.log("CF M->V", modelValue);
    return modelValue || "";
  }

  viewToModel(viewValue: string): string {
    console.log("CF v->m", viewValue);
    return (viewValue || "").toUpperCase();
  }

  validate(control: AbstractControlTyped<string>): ValidationErrors | null {
    console.log("CF VALIDATE", control.value);
    if (!control.value || control.value.length != 16) return { codfisc: "INVALID LENGHT CODICE FISCALE" };
    if (control.value.match(/^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/g)) return null;
    //GRAZIE A MARKETTO
    //OK LUNGO 16 + MATCHA LA REGEX
    else return { codfisc: "INVALID FORMAT CODICE FISCALE" };
  }
}
