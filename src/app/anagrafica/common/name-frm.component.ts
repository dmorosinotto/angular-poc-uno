import { Component, Self, Optional, Inject } from "@angular/core";
import { FormGroup, FormControl, NgControl, Validators } from "@angular/forms";
import { BaseFrmComponent } from "@base/base-frm.component";
import { LAYOUT_TOKEN, Layouts } from "@base/LayoutToken";
import { ContextService } from "@base/context.service";
import { CODFISC_TOKEN } from "../anagrafica-page/anagrafica.page";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-name-frm",
  template: `
    <!--
    <section *ngIf="layout === 'VIEW'; else notVIEW">
      <label>Name:</label> {{ frm.controls["name"].value }}
      <br />
      <label>Surname:</label> {{ frm.controls["surname"].value }}
      <br />
      <label>dato:</label>
      {{ frm.controls["dato"].value | uppercase }}
    </section>
    <ng-template #notVIEW>
      <fieldset [formGroup]="frm">
        <h4>
          Fieldset name <span>{{ layout }}</span>
        </h4>
        <ui-textbox label="Name" formControlName="name"></ui-textbox>
        <ui-textbox label="Surname" formControlName="surname"></ui-textbox>
        <ui-textbox label="dato" formControlName="dato"></ui-textbox>
      </fieldset>
    </ng-template>-->
    <h5>{{ layout }}</h5>

    <ng-container [ngSwitch]="layout">
      <section *ngSwitchCase="'VIEW'">
        <label>Name:</label> {{ frm.controls["name"].value }}
        <br />
        <label>Surname:</label> {{ frm.controls["surname"].value }}
        <br />
        <label>dato:</label>
        {{ frm.controls["dato"].value | uppercase }}
      </section>

      <table *ngSwitchCase="'GRID'">
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Dato</th>
        </tr>
        <tr>
          <td>{{ frm.controls["name"].value }}</td>
          <td>{{ frm.controls["surname"].value }}</td>
          <td>{{ frm.controls["dato"].value }}</td>
        </tr>
      </table>

      <fieldset *ngSwitchDefault [formGroup]="frm">
        <h4>
          Fieldset name <span>{{ layout }}</span>
        </h4>
        <ui-textbox label="Name" formControlName="name"></ui-textbox>
        <ui-textbox label="Surname" formControlName="surname"></ui-textbox>
        <ui-textbox label="dato" formControlName="dato"></ui-textbox>
      </fieldset>
    </ng-container>
  `,
  styles: [
    "ui-textbox.ng-invalid { border-left: 4px solid red; padding-left: 6px }",
    "ui-textbox.ng-valid { border-left: 4px solid green; padding-left: 2px }",
    "span {color: violet; font-size:25px }"
  ]
})
export class NameFrmComponent extends BaseFrmComponent<{ name: string; surname: string; dato: string }> {
  initFrm() {
    return new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      surname: new FormControl(""),
      dato: new FormControl("")
    }) as FormGroupTyped<{ name: string; surname: string; dato: string }>;
  }

  constructor(
    @Optional() @Self() public controlDir: NgControl,
    @Inject(LAYOUT_TOKEN) public layout: Layouts,
    private ctx: ContextService
  ) {
    super(controlDir);
    this.ctx.get$(CODFISC_TOKEN).subscribe(cf => {
      this.frm.patchValue({ dato: cf });
      this.frm.updateValueAndValidity();
    });
  }
}
