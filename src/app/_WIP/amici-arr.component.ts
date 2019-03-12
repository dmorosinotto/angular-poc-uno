import { Component, OnInit, Self, Injector } from "@angular/core";
import {
  FormArray,
  FormControl,
  NgControl,
  ControlValueAccessor,
  AbstractControl,
  Validator,
  Validators,
  FormGroup,
  ControlContainer
} from "@angular/forms";
import { AddressFrmComponent } from "../anagrafica/common/address-frm.component";
import { NameFrmComponent } from "../anagrafica/common/name-frm.component";

@Component({
  selector: "app-amici-arr",
  template: `
    <fieldset [formGroup]="frm">
      <h4>Fieldset array</h4>
      <div class="button-right">
        <button (click)="add()" class="green">Add</button>
      </div>
      <div formArrayName="amici">
        <article *ngFor="let ctrl of arr.controls; index as i">
          <div class="button-right">
            <button (click)="rem(i)" class="brown">Remove</button>
          </div>
          <app-name-frm [formControlName]="i"></app-name-frm>
        </article>
      </div>
    </fieldset>
  `,
  styles: []
})
export class AmiciArrComponent implements ControlValueAccessor, Validator, OnInit {
  onTouch = () => {};

  frm = new FormGroup({
    amici: new FormArray([])
  });
  arr: FormArray;
  constructor(@Self() public controlDir: NgControl /*, private injector: Injector*/) {
    this.arr = this.frm.get("amici") as FormArray;
    controlDir.valueAccessor = this;
    // console.log('CTRLDIR', controlDir);
  }
  writeValue(val: any): void {
    // console.log('ARR val', val, ' model -> view');
    if (val && val.amici) {
      if (this.arr.length != val.amici.length) {
        // console.log('ALLINEO ARRAY DATI -> ARRAY DI FRMGROUP');
        for (let i = this.arr.length; i < val.amici.length; i++) {
          this.arr.push(new FormControl(null));
        }
      }
      this.frm.patchValue(val, { emitEvent: false });
      this.frm.updateValueAndValidity({ onlySelf: true });
    }
  }

  /* TODO: DYNAMIC ITEM CHILD COMPONENT

<!--<div [formControl]="ctrl" #idx="ngForm">
            <ng-container *ngComponentOutlet="itemCmpType; injector: injectNgControl(idx)"></ng-container>
          </div>-->

  itemCmpType = NameFrmComponent;
  injectNgControl(ctrl: NgControl) {
    console.log("INJECTOR PER ", ctrl);
    return Injector.create([{ provide: NgControl, useValue: ctrl }], this.injector);
  }
  */

  registerOnChange(fnChange: (val: any) => void): void {
    // console.log('ADESSO ARR FMCHANGE', fnChange);
    this.frm.valueChanges.subscribe(fromView => {
      // console.log('ARR valFromView', fromView, ' call fnChange view -> model');
      fnChange(fromView);
    });
  }

  //onTouch: Function;
  registerOnTouched(fn: any): void {
    // ribellione any by Aly
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    // console.log('set Disable -> ', isDisabled);
    if (isDisabled) this.arr.disable();
    else this.arr.enable();
  }

  add() {
    this.arr.push(new FormControl(null));
  }

  rem(i: number) {
    this.arr.removeAt(i);
  }

  validate(ctrl: AbstractControl) {
    return null;
  }

  ngOnInit() {
    const control = this.controlDir.control;
    //let validators = control.validator ? [control.validator, Validators.required] : Validators.required;
    //control.setValidators(validators);
    //control.updateValueAndValidity();
  }
}
