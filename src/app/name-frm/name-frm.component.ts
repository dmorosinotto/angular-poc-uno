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
import { allErrors } from "../all-errors.pipe";

@Component({
  selector: "app-name-frm",
  template: `
    <fieldset [formGroup]="frm">
      <h4>Fieldset name</h4>
      <ui-textbox label="Name" formControlName="name"></ui-textbox>
      <ui-textbox label="Surname" formControlName="surname"></ui-textbox>
    </fieldset>
    VAL={{ frm.valid }} ERR={{ frm | allerr | json }}
    <pre>name.REQ = {{ frm.getError("required", "name") | json }} </pre>
    <pre>name.MINLEN = {{ frm.getError("minlength", "name") | json }} </pre>
    <pre>name.ERRORS = {{ frm.controls.name.errors | json }} </pre>
  `,
  styles: ["ui-textbox.ng-invalid { border-left: 2px solid red }", "ui-textbox.ng-valid { border: 1px solid green }"]
})
export class NameFrmComponent extends BaseFrmComponent<{ name: string; surname: string }> {
  initFrm() {
    return new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      surname: new FormControl("")
    }) as FormGroupTyped<{ name: string; surname: string }>;
  }

  constructor(@Self() public controlDir: NgControl) {
    super(controlDir);
  }
}
