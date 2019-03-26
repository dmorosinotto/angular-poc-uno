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
  NG_VALUE_ACCESSOR
} from "@angular/forms";
import { AddressFrmComponent } from "./common/address-frm.component";
import { NameFrmComponent } from "./common/name-frm.component";

@Component({
  selector: "app-amicici-arr",
  template: `
    <fieldset>
      <h4>NEW ATTACH ARRAY</h4>
      <div class="button-right">
        <button (click)="add()" class="green">Add</button>
      </div>
      <div>
        <!--<b>{{ arr.length }} =?= {{ arr.controls.length }}</b>-->
        <article *ngFor="let ctrl of arr.controls; index as i">
          <div class="button-right">
            <button (click)="rem(i)" class="error">Remove</button>
          </div>
          <i>{{ i }} - {{ ctrl.value | json }}</i>

          <app-name-frm [formControl]="ctrl"></app-name-frm>
        </article>
      </div>
    </fieldset>
  `,
  styles: [],
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => AmiciciArrComponent) }]
  //providers: [{ provide: NgControl, multi: true, useExisting: forwardRef(() => AmiciciArrComponent) }]
})
export class AmiciciArrComponent implements ControlValueAccessor, Validator, OnInit {
  onTouch = () => {};

  arr: FormArray;
  constructor(private _ctrl: ControlContainer /* @SkipSelf() private ctrlDir: NgControl*/) {
    console.log("(ctor) IS ARRAY ctrlDir", _ctrl);
    //this.arr = this._ctrl.control as FormArray; //QUI E' TROPPO PRESTO _ctrl == NULL!!!
    // console.log('CTRLDIR', controlDir);
    //controlDir.valueAccessor = this;
  }
  writeValue(val: any[]): void {
    // console.log('ARR val', val, ' model -> view');
    alert("HEI");
    console.warn("DOPO ONINIT AMICICI? - HEIIIII >>>", val);
    if (val && this.arr) {
      this.arr.disable();
      console.log(">>>> ARR writeValue", val);
      //TODO: CAPIRE LA TEMPISTICA OnInit vs 1st writeVAlue
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
      //this.arr.updateValueAndValidity({ onlySelf: true });
    } else {
      console.warn("AHI AHI AHI TROPPO PRESTO... ");
    }
  }

  ngOnInit() {
    console.info("(onInit) IS ARRAY ctrlDir", this._ctrl);
    this.arr = this._ctrl.control as FormArray;
    console.warn("ONINIT - AMICICI");
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
    console.warn("AMICICI - REGISTERONCHANGE");
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
