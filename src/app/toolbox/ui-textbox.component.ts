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

const IMPLEMENT_VALIDATE_LOGIC = null;

@Component({
  selector: "ui-textbox",
  template: `
    <label
      >{{ label }}
      <input [formControl]="ctrl" />
    </label>
  `,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => UiTextboxComponent) }
    //{ provide: NG_VALIDATORS, multi: true, useExisting: forwardRef(() => UiTextboxComponent) }
  ],
  styles: ["input.ng-invalid { border-left: 2px solid red }", "input.ng-valid { border: 1px solid green }"]
})
export class UiTextboxComponent implements OnInit, ControlValueAccessor {
  writeValue(val: any): void {
    //model -> view
    val && this.ctrl.setValue(val, { emitEvent: false });
  }
  registerOnChange(fn: (val: any) => void): void {
    //view -> model
    this.ctrl.valueChanges.subscribe(fn);
  }
  onTouched: () => void;
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.ctrl.disable() : this.ctrl.enable();
  }

  //validate(control: AbstractControl): ValidationErrors {
  //  return IMPLEMENT_VALIDATE_LOGIC;
  //}

  @Input() label: string;
  ctrl = new FormControl(null);
  constructor() {}

  ngOnInit() {}
}
