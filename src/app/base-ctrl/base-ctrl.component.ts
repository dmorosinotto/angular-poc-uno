import { BaseComponent } from "../base-destroy-cmp/base.component";
import { ControlValueAccessor, FormControl, ValidationErrors } from "@angular/forms";
import { map } from "rxjs/operators";

type IKNOW_IT_IS_VALID_CAST = any;

export abstract class BaseCtrl<M, V = M> extends BaseComponent implements ControlValueAccessor {
  abstract modelToView(modelValue: M): V;

  abstract viewToModel(viewValue: V): M;

  writeValue(val: M): void {
    //model -> view
    val && this.ctrl.setValue(this.modelToView(val) as IKNOW_IT_IS_VALID_CAST, { emitEvent: false });
  }
  registerOnChange(fn: (val: M) => void): void {
    //view -> model
    this.ctrl.valueChanges.pipe(map(val => this.viewToModel(val))).subscribe(fn);
  }

  onTouched: () => void;
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.ctrl.disable() : this.ctrl.enable();
  }

  ctrl = new FormControl(null) as FormControlTyped<V>;
  constructor() {
    super();
  }
}
