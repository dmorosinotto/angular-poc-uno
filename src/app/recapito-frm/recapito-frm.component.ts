import { Component, Self } from "@angular/core";
import { FormGroup, FormControl, NgControl } from "@angular/forms";
import { BaseFrmComponent } from "../base-form/base-form.component";
import { IRecapito } from "../_DAL/IRecapito";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-recapito-frm",
  template: `
    <div [formGroup]="frm">
      <label class="checkbox-label"> <input type="checkbox" formControlName="uguaglio" /> Uguaglio</label>
      <app-address-frm *ngIf="frm.contains('recapito')" formControlName="recapito"></app-address-frm>
      RECAPITO = {{ frm.contains("recapito") }}
    </div>
  `,
  styles: []
})
export class RecapitoFrmComponent extends BaseFrmComponent<IRecapito> {
  onTouch = () => {};
  //onTouch: () => {};
  // onChange: (_: any) => {};
  initFrm() {
    const frm = new FormGroup({
      uguaglio: new FormControl(false),
      recapito: new FormControl(null)
    }) as FormGroupTyped<IRecapito>;
    //frm.get("recapito").disable();
    return frm;
  }
  constructor(@Self() public controlDir: NgControl) {
    super(controlDir);
    //LOGICA DI INTERFACCIA/BUSINESS PER TENERE COERENTE uguaglio <-> enable/disable
    this.frm
      .get("uguaglio")
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(u => {
        console.log("????CHANGE UGUAGLIO", u);
        u ? this.frm.get("recapito").disable() : this.frm.get("recapito").enable();
      });
  }
  writeValue(val: IRecapito) {
    console.log(">>>> WRITE", val);
    //ABBIAMO MODIFICATO FORMBASE PER FARE LA patchValue {onlySelf: true} COSI CI RISPARMIAMO QUESTO:
    //this.frm.updateValueAndValidity({ onlySelf: true }); //SCATENA IL VALUECHANGE --> CHE FA enable/disable
    //val && val.uguaglio ? this.frm.get("recapito").disable() : this.frm.get("recapito").enable();
    super.writeValue(val);
  }
}
