import { Component, OnInit, Self } from "@angular/core";
import {
  FormGroup,
  FormControl,
  NgControl,
  ControlValueAccessor,
  AbstractControl,
  Validator,
  Validators
} from "@angular/forms";
import { BaseFrmComponent } from "../base-frm/base-frm.component";

@Component({
  selector: "app-address-frm",
  template: `
    <fieldset [formGroup]="frm">
      <h4>Fieldset indirizzo</h4>
      <label>Via</label><input formControlName="via" (blur)="onTouch()" /> <label>CAP</label
      ><input type="number" formControlName="cap" (blur)="onTouch()" /> <label>Città</label
      ><input formControlName="citta" (blur)="onTouch()" /> <label>Prov</label
      ><input formControlName="prov" (blur)="onTouch()" />
    </fieldset>
  `,
  styles: []
})
export class AddressFrmComponent extends BaseFrmComponent<IAddress> {
  onTouch = () => {};
  //onTouch: () => {};
  // onChange: (_: any) => {};
  initFrm() {
    return new FormGroup({
      via: new FormControl(""),
      cap: new FormControl(0),
      citta: new FormControl(""),
      prov: new FormControl("")
    }) as FormGroupTyped<IAddress>;
  }
  constructor(@Self() public controlDir: NgControl) {
    super(controlDir);
  }
}
