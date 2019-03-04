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
import { BaseCtrl } from "../base-ctrl/base-ctrl.component";

const IMPLEMENT_VALIDATE_LOGIC = null;

@Component({
  selector: "ui-datetime",
  template: `
    <label
      >{{ label }}
      <input type="datetime-local" [formControl]="ctrl" />
    </label>
  `,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => UiDateTimeComponent) },
    { provide: NG_VALIDATORS, multi: true, useExisting: forwardRef(() => UiDateTimeComponent) }
  ]
})
export class UiDateTimeComponent extends BaseCtrl<string, Date> implements Validator {
  @Input() label: string;
  constructor() {
    super();
  }

  modelToView(modelValue: string): Date {
    return new Date(modelValue); //TODO: DA SISTEMARE PERCHE input type="datetime-local" vuole STRING in in gresso... CHE NULLI!! UTC RULEZ
  }

  viewToModel(viewValue: Date): string {
    console.log("DATA??", viewValue, typeof viewValue);
    return new Date(viewValue).toISOString(); //Riconverto da LOCAL string -> UTC (solo perchè type="datetime-local" mi da stringhe)
  }

  validate(control: AbstractControl): ValidationErrors {
    return IMPLEMENT_VALIDATE_LOGIC;
  }
}
