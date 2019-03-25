import { Component, Input, TemplateRef } from "@angular/core";
import { FormControl } from "@angular/forms";

interface IItemArrayCtx {
  $implicit: AbstractControl;
  idx: number;
}

@Component({
  selector: "form-array",
  template: `
    <div class="button-right">
      <button (click)="add()" class="green">Add</button>
    </div>
    <div>
      <article *ngFor="let ctrl of arr.controls; index as idx">
        <div class="button-right">
          <button (click)="rem(idx)" class="error">Remove</button>
        </div>
        <ng-container *ngTemplateOutlet="itemTpl; context: getCtx(ctrl, idx)"></ng-container>
      </article>
    </div>
  `
})
export class FormArrayComponent {
  @Input() arr: FormArray;
  @Input() itemTpl: TemplateRef<IItemArrayCtx>;

  constructor() {}

  getCtx(ctrl: any, idx: number) {
    return { $implicit: ctrl, idx };
  }

  add() {
    this.arr.push(new FormControl(null));
  }

  rem(i: number) {
    this.arr.removeAt(i);
  }
}
