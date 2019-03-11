import { Component, OnInit, Self, Injector, forwardRef, SkipSelf } from "@angular/core";
import {
  FormArray,
  FormControl,
  NgControl,
  ControlValueAccessor,
  AbstractControl,
  Validator,
  Validators,
  FormGroup,
  ControlContainer,
  NG_VALUE_ACCESSOR,
  ValidationErrors
} from "@angular/forms";
import { AddressFrmComponent } from "../address-frm/address-frm.component";
import { NameFrmComponent } from "../name-frm/name-frm.component";
import { allErrors } from "../all-errors.pipe";

@Component({
  selector: "app-friends-arr",
  template: `
    <fieldset ngClass="{'ng-invalid': arr.invalid; 'ng-valid': arr.valid}">
      <h4>FRIENDS ARRAY</h4>
      <div class="button-right">
        <button (click)="add()" class="green">Add</button>
      </div>
      <div>
        <!--<b>{{ arr.length }} =?= {{ arr.controls.length }}</b>-->
        <article *ngFor="let ctrl of arr.controls; index as i">
          <div class="button-right">
            <button (click)="rem(i)" class="brown">Remove</button>
          </div>
          <i>{{ i }} - {{ ctrl.value | json }} - VALID={{ arr.valid }} ERRORS={{ arr.errors | json }} </i>

          <app-name-frm [formControl]="ctrl"></app-name-frm>
        </article>
      </div>
    </fieldset>
  `,
  styles: [
    "*.ng-invalid { border-left: 4px solid blue; padding-left:10px }",
    "*.ng-valid { border: 4px solid yellow; padding-left:10px }"
  ]
})
export class FriendsArrComponent implements ControlValueAccessor, OnInit {
  onTouch = () => {};

  arr = new FormArray([], this.atLeastOne);
  constructor(/*private _ctrl: ControlContainer */ private controlDir: NgControl) {
    //console.log("(ctor) FRIENDS ARRAY ctrlDir", this._ctrl);
    //this.arr = this._ctrl.control as FormArray; //QUI E' TROPPO PRESTO _ctrl == NULL!!!
    console.log("FRIENDS CTRLDIR", controlDir);
    controlDir.valueAccessor = this;
  }
  writeValue(val: any[]): void {
    // console.log('ARR val', val, ' model -> view');
    console.warn("WRITEVALUE sempre dopo ONINIT - FRIENDS!", val);
    if (val && this.arr) {
      this.arr.disable();
      console.log(">>>> FRIENDS ARR writeValue", val);
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
      console.error("FRIENDS AHI AHI AHI TROPPO PRESTO... ");
    }
  }

  ngOnInit(): void {
    //console.info("(onInit) IS ARRAY ctrlDir", this._ctrl);
    //this.arr = this._ctrl.control as FormArray;
    console.warn("ONINIT - FRIENDS");
    const currValidators = this.controlDir.control.validator;
    if (currValidators) {
      this.controlDir.control.setValidators([currValidators, this.allFrmErrors.bind(this)]);
    } else {
      this.controlDir.control.setValidators(this.allFrmErrors.bind(this));
    }
  }

  private allFrmErrors(_: AbstractControl): ValidationErrors {
    console.log("VALIDATORE INTERNO ARR", _.value, allErrors(this.arr));
    if (this.arr.valid) return null;
    else return { [this.controlDir.path.join(".")]: allErrors(this.arr) };
  }

  private atLeastOne(arr: FormArray): ValidationErrors {
    console.log("VALIDATORE CUSTOM atLeastOne", arr && arr.value);
    if (arr && arr.value) {
      if (arr.value.length > 1) return null;
      //VALIDO SE ITEMS > 1!
      else return { atLeastOne: "SPERO TU ABBIA ALMENO UN AMICO" };
    } else return null; //ACCETTO ARRAY NULL
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

  registerOnChange(fnChange: (val: any[]) => void): void {
    console.warn("FRIENDS - REGISTERONCHANGE");
    // console.log('ADESSO ARR FMCHANGE', fnChange);
    this.arr.valueChanges.subscribe(fnChange);
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
}
