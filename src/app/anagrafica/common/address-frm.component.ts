import { Component, Self } from "@angular/core";
import { FormGroup, FormControl, NgControl, Validators, ValidationErrors } from "@angular/forms";
import { BaseFrmComponent } from "@base/base-frm.component";
import { ContextService } from "@base/context.service";
import { PROVLIST_TOKEN } from "../anagrafica-page/anagrafica.page";
import { map } from "rxjs/operators";

@Component({
  selector: "app-address-frm",
  template: `
    <fieldset [formGroup]="frm">
      <h4>Fieldset indirizzo {{ (getProv$(frm.get("prov").value) | async)?.id }}</h4>
      <label>Via</label><input formControlName="via" (keyup.enter)="onEnter($event.target, 'via')" /> <label>CAP</label
      ><input type="number" formControlName="cap" /> <label>Città</label
      ><input type="text" formControlName="citta" required /> <label>Prov</label
      ><select formControlName="prov" (keyup.enter)="onEnter($event.target, 'prov')">
        <option *ngFor="let p of (lookupProv$ | async)" [value]="p.prov">{{ p.prov }} - {{ p.regione }}</option>
      </select>
    </fieldset>
  `
})
export class AddressFrmComponent extends BaseFrmComponent<IAddress> {
  initFrm(): FormGroupTyped<IAddress> {
    return new FormGroup(
      {
        via: new FormControl(""),
        cap: new FormControl(0, [Validators.min(30000), Validators.max(40000)]),
        citta: new FormControl("", { updateOn: "change" }), //AGGIUNTO required NEL TEMPLATE
        prov: new FormControl("", this.validProv)
      },
      { updateOn: "blur" }
    ) as FormGroupTyped<IAddress>;
  }

  constructor(@Self() public controlDir: NgControl, private ctx: ContextService) {
    super(controlDir);
  }

  public lookupProv$ = this.ctx.get$(PROVLIST_TOKEN);

  public getProv$(prov: string): Observable<IProvincia | undefined> {
    return this.lookupProv$.pipe(map(list => list.find(x => x.prov === prov)));
  }

  onEnter(el: HTMLInputElement, fldName: keyof IAddress) {
    //alert("ENTER");
    console.log("ENTER on field", fldName, el);
    //this.frm.controls[fldName].updateValueAndValidity();
    //console.log("UPDVAL", this.frm.controls[fldName]);
    el.blur(); //SUPER TRICKY BUT NEEDED TO INVOKE ANGULAR INTERNAL LOGIC TO PROPAGATE updateOn:'blur'
    this.onTouch();
  }

  validProv(ctrl: AbstractControlTyped<string>): ValidationErrors | null {
    if (ctrl && ctrl.value && ctrl.value.length == 2) return null;
    return { prov: false }; //INVALID PROV
  }
}
