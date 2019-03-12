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
  ValidationErrors,
  Form
} from "@angular/forms";
import { AddressFrmComponent } from "../address-frm/address-frm.component";
import { NameFrmComponent } from "../name-frm/name-frm.component";
import { aggregateErrors } from "../all-errors.pipe";
import { Type } from "@angular/core";
import { BaseArrComponent } from "../base-arr/base-arr.component";

@Component({
  selector: "app-friends-arr",
  template: `
    <fieldset ngClass="{'ng-invalid': arr.invalid; 'ng-valid': arr.valid}">
      <ng-template #item let-ctrl let-i="idx">
        <h3>AMICO N.{{ i }}</h3>
        <app-name-frm [formControl]="ctrl"></app-name-frm
      ></ng-template>

      <h4>FRIENDS ARRAY</h4>
      <form-array [arr]="arr" [itemTpl]="item"></form-array>

      <!-- TODO: Structural Directive
      <ng-container *forEach="let ctrl in arr; idx as i">
        <h3>AMICO N.{{ i }}</h3>
        <app-name-frm [formControl]="ctrl"></app-name-frm>
      </ng-container>
      -->

      <pre>
      ARR VALID={{ arr.valid }} 
      ERRORS={{ arr.errors | json }}
      </pre
      >
    </fieldset>
  `,
  styles: [
    "*.ng-invalid { border-left: 4px solid blue; padding-left:10px }",
    "*.ng-valid { border: 4px solid yellow; padding-left:10px }"
  ]
})
export class FriendsArrComponent extends BaseArrComponent<IFullname> {
  initArr(): FormArrayTyped<IFullname> {
    return new FormArray([], this.atLeastOne) as FormArrayTyped<IFullname>;
  }

  constructor(public controlDir: NgControl) {
    super(controlDir);
    console.log("FRIENDS CTRLDIR", controlDir);
  }

  private atLeastOne(arr: FormArray): ValidationErrors {
    console.log("VALIDATORE CUSTOM atLeastOne", arr && arr.value);
    if (arr && arr.value && arr.value.length > 1) return null;
    //VALIDO SE ITEMS > 1!
    else return { atLeastOne: "SPERO TU ABBIA ALMENO UN AMICO" };
  }
}
