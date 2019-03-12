import { Component, OnInit, ViewChild, AfterViewInit, forwardRef } from "@angular/core";
import { ControlContainer } from "@angular/forms";
import { BaseComponent } from "@base/base.component";

@Component({
  selector: "app-nominativo-fld",
  template: `
    <fieldset>
      <h4>Fieldset nominativo</h4>
      <ui-textbox label="Nome" formAttachName="nome"></ui-textbox>
      <ui-textbox label="Cognome" formAttachName="cognome"></ui-textbox>
    </fieldset>
  `
})
export class NominativoFldComponent extends BaseComponent {
  constructor(public parent: ControlContainer) {
    super();
    console.log(this.parent);
  }
}
