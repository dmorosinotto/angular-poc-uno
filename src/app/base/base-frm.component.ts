import { Self, OnInit, Optional } from "@angular/core";
import { FormGroup, NgControl, ControlValueAccessor, ValidatorFn, ValidationErrors } from "@angular/forms";
import { BaseComponent } from "./base.component";
import { aggregateErrors } from "./all-errors.pipe";
import { takeUntil, take } from "rxjs/operators";
type IKNOW_T_ISVALID_PARTIAL = any;
export abstract class BaseFrmComponent<T> extends BaseComponent implements ControlValueAccessor, OnInit {
  abstract initFrm(): FormGroupTyped<T>;

  frm: FormGroupTyped<T>;
  constructor(@Optional() @Self() public controlDir: NgControl) {
    super();
    this.frm = this.initFrm();
    controlDir.valueAccessor = this;
    // console.log("CTRLDIR", controlDir);
  }
  writeValue(val: T): void {
    // console.log("val", val, " model -> view");
    val && this.frm.patchValue(val as IKNOW_T_ISVALID_PARTIAL, { emitEvent: false, onlySelf: true });
  }

  registerOnChange(fnChange: (val: T) => void): void {
    // console.log("ADESSO", fnChange);
    this.frm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(fromView => {
      // console.log("valFromView", fromView, " call fnChange view -> model");
      fnChange(fromView);
    });
  }

  onTouch = () => {};
  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
    this.frm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(_ => this.onTouch());
  }

  setDisabledState?(isDisabled: boolean): void {
    console.log("set Disable -> ", isDisabled);
    if (isDisabled) this.frm.disable();
    else this.frm.enable();
  }

  ngOnInit(): void {
    const ctrl /*:FormGroup*/ = this.controlDir.control;
    if (ctrl) {
      if (ctrl.validator) {
        ctrl.setValidators([ctrl.validator, this.allFrmErrors.bind(this)]);
      } else {
        ctrl.setValidators(this.allFrmErrors.bind(this));
      }
    }
  }

  private allFrmErrors(_: AbstractControl): ValidationErrors | null {
    if (this.frm.valid) return null;
    else return { [(this.controlDir.path || []).join(".")]: aggregateErrors(this.frm) };
  }
}
