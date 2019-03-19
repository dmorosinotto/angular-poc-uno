import { OnInit, Self } from "@angular/core";
import { BaseComponent } from "./base.component";
import { NgControl, FormControl, ControlValueAccessor, ValidationErrors } from "@angular/forms";
import { aggregateErrors } from "./all-errors.pipe";

export abstract class BaseArrComponent<T> extends BaseComponent implements ControlValueAccessor, OnInit {
  abstract initArr(): FormArrayTyped<T>;

  arr: FormArrayTyped<T>;
  constructor(@Self() public controlDir: NgControl) {
    super();
    this.arr = this.initArr();
    controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    //console.info("(onInit) IS ARRAY ctrlDir", this.controlDir);
    //this.arr = this.controlDir.control as FormArray;
    const ctrl /*:FormArray*/ = this.controlDir.control;
    if (ctrl) {
      if (ctrl.validator) {
        ctrl.setValidators([ctrl.validator, this.allArrErrors.bind(this)]);
      } else {
        ctrl.setValidators(this.allArrErrors.bind(this));
      }
    }
  }

  private allArrErrors(_: AbstractControl): ValidationErrors | null {
    console.warn("??? VALIDATORE INTERNO ARR", _.value, this.arr.valid, aggregateErrors(this.arr));
    if (this.arr.valid) return null;
    else return { [(this.controlDir.path || []).join(".")]: aggregateErrors(this.arr) };
  }

  writeValue(val: T[]): void {
    // console.log('writeVALUE sempre dopo ONINIT - ARR val', val, ' model -> view');
    if (val && this.arr) {
      this.arr.disable();
      //console.log(">>>> ARR writeValue", val);
      if (this.arr.length != val.length) {
        // console.log('ALLINEO ARRAY DATI -> ARRAY DI FRMGROUP');
        if (this.arr.length < val.length) {
          for (let i = this.arr.length; i < val.length; i++) {
            this.arr.push(new FormControl(null));
          }
        } else {
          for (let i = this.arr.length - 1; i >= val.length; i--) {
            this.arr.removeAt(i);
          }
        }
      }
      this.arr.enable();
      this.arr.patchValue(val, { emitEvent: false });
      this.arr.updateValueAndValidity({ onlySelf: true });
    } else {
      //console.error(">>> writeValue TROPPO PRESTO.... ");
    }
  }

  registerOnChange(fnChange: (val: any[]) => void): void {
    console.warn("FRIENDS - REGISTERONCHANGE");
    // console.log('ADESSO ARR FMCHANGE', fnChange);
    this.arr.valueChanges.subscribe(fnChange);
  }

  onTouch = () => {};
  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // console.log('set Disable -> ', isDisabled);
    if (isDisabled) this.arr.disable();
    else this.arr.enable();
  }
}
