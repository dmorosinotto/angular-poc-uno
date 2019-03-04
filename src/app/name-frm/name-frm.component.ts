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
  selector: "app-name-frm",
  template: `
    <fieldset [formGroup]="frm">
      <h4>Fieldset name</h4>
      <ui-textbox label="Name" formControlName="name"></ui-textbox>
      <ui-textbox label="Surname" formControlName="surname"></ui-textbox>
    </fieldset>
  `,
  styles: []
})
export class NameFrmComponent extends BaseFrmComponent<{ name: string; surname: string }> {
  initFrm() {
    return new FormGroup({
      name: new FormControl(""),
      surname: new FormControl("")
    }) as FormGroupTyped<{ name: string; surname: string }>;
  }

  constructor(@Self() public controlDir: NgControl) {
    super(controlDir);
  }
}
