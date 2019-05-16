import { Component, Input, ContentChildren, QueryList, ViewChild, ViewContainerRef, Optional, Output, EventEmitter } from "@angular/core";
import { mycolDirective } from "./mycolDirective";
import { mySampleComponent } from "./mysampleComponent";

@Component({
  selector: "mytable",
  template: `
    <table>
      <thead>
        <tr>
          <ng-content select="[mycol]"></ng-content>
        </tr>
      </thead>
      <tbody #body>
        <tr *ngFor="let row of (data | async)">
          <td *ngFor="let c of cols">
            {{ row[c.name] }}
          </td>
        </tr>
      </tbody>
      <tfoot>
        <ng-content></ng-content>
      </tfoot>
    </table>

  `
})
export class mytableComponent {
  @Input() data: Observable<unknown[]>;
  @ContentChildren(mycolDirective) cols: QueryList<mycolDirective>;
  @ViewChild("body", { read: ViewContainerRef }) mybody: ViewContainerRef;
  @Output() selected = new EventEmitter<number>();

  Pippo() {
    this.mybody.createEmbeddedView();
  }

  constructor(@Optional() mypapi: mySampleComponent | null) {

  }
}
