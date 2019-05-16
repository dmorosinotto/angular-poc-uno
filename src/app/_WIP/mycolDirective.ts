import { Input, Directive } from "@angular/core";

@Directive({
  selector: "[mycol]"
})
export class mycolDirective {
  @Input() public name: string;
}
