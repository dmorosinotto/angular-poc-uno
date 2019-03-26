import { Component } from "@angular/core";
import { FormArray, NgControl, ValidationErrors } from "@angular/forms";
import { BaseArrComponent } from "@base/base-arr.component";
import { LAYOUT_TOKEN, ILayoutWizzard } from "@base/LayoutToken";

@Component({
  selector: "app-friends-arr",
  template: `
    <fieldset ngClass="{'ng-invalid': arr.invalid; 'ng-valid': arr.valid}">
      <ng-template #item let-ctrl let-i="idx">
        <h3>AMICO N.{{ i }}</h3>
        <app-name-frm [formControl]="ctrl"></app-name-frm>
      </ng-template>

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
  styles: ['*.ng-invalid:before { content: "!!!"; color: red }', '*.ng-valid:before { content: "Ok"; color: green }'],

  providers: [{ provide: LAYOUT_TOKEN, useValue: { type: "WIZZARD" } as ILayoutWizzard }]
})
export class FriendsArrComponent extends BaseArrComponent<IFullname> {
  initArr(): FormArrayTyped<IFullname> {
    return new FormArray([], this.atLeastOne) as FormArrayTyped<IFullname>;
  }

  constructor(public controlDir: NgControl) {
    super(controlDir);
    console.log("FRIENDS CTRLDIR", controlDir);
  }

  private atLeastOne(arr: FormArray): ValidationErrors | null {
    console.log("VALIDATORE CUSTOM atLeastOne", arr && arr.value);
    if (arr && arr.value && arr.value.length >= 1) return null;
    //VALIDO SE ITEMS > 1!
    else return { atLeastOne: "SPERO TU ABBIA ALMENO UN AMICO" };
  }
}
