import { Component, Self, Optional } from "@angular/core";
import { FormGroup, FormControl, NgControl, ValidationErrors } from "@angular/forms";
import { BaseFrmComponent } from "@base/base-frm.component";
import { takeUntil } from "rxjs/operators";
import { LAYOUT_TOKEN, Layouts } from "@base/LayoutToken";

@Component({
  selector: "app-xxx-frm",
  template: `
    <fieldset [formGroup]="frm">
      <h4>XXX Amici</h4>
      <app-friends-arr formControlName="amici"></app-friends-arr>
      <hr />
      <span>QUANTI: </span
      ><u
        ><i>{{ frm.controls.quanti.value }}</i></u
      >
    </fieldset>
  `,
  providers: [{ provide: LAYOUT_TOKEN, useValue: "VIEW" as Layouts }]
})
export class XxxFrmComponent extends BaseFrmComponent<IXxx> {
  initFrm() {
    return new FormGroup({
      amici: new FormControl([], this.atLeastTwo),
      quanti: new FormControl(0)
    }) as FormGroupTyped<IXxx>;
  }

  constructor(@Optional() @Self() public controlDir: NgControl) {
    super(controlDir);
    //ESEMPIO DI BUSINESS LOGIC TIENE ALLINEATO QUANTI <--> AMICI.length
    this.frm.controls.amici.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(arr => this.frm.patchValue({ quanti: arr.length }));
  }

  private atLeastTwo(arr: FormArray): ValidationErrors | null {
    console.log("VALIDATORE CUSTOM atLeastOne", arr && arr.value);
    if (arr && arr.value && arr.value.length == 2) return null;
    //VALIDO SE ITEMS > 1!
    else return { atLeastTwo: "NON HAI 2 AMICI" };
  }
}
