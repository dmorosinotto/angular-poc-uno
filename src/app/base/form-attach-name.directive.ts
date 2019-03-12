type IKNOWINTERNAL = any;

import {
  Directive,
  SkipSelf,
  Optional,
  Self,
  Inject,
  forwardRef,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import {
  FormControlName,
  FormGroup,
  ControlContainer,
  NG_VALIDATORS,
  Validator,
  ValidatorFn,
  NG_ASYNC_VALIDATORS,
  AsyncValidator,
  AsyncValidatorFn,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  NgControl,
  AbstractFormGroupDirective,
  FormControl
} from "@angular/forms";

@Directive({
  selector: "[formAttachName]",
  providers: [{ provide: NgControl, useExisting: forwardRef(() => FormAttachNameDirective) }]
})
export class FormAttachNameDirective extends FormControlName implements OnChanges {
  constructor(
    @SkipSelf() private __parent: ControlContainer,
    @Optional() @Self() @Inject(NG_VALIDATORS) validators: Array<Validator | ValidatorFn>,
    @Optional() @Self() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<AsyncValidator | AsyncValidatorFn>,
    @Optional() @Self() @Inject(NG_VALUE_ACCESSOR) valueAccessors: ControlValueAccessor[]
  ) {
    super(__parent, validators, asyncValidators, valueAccessors, null);
    console.warn("PAPI", __parent);
    console.log("VA", valueAccessors);
  }

  fgParent: FormGroup;

  @Input("formAttachName") name: string;

  ngOnChanges(changes: SimpleChanges) {
    console.warn("ON CHANGES", changes);
    if (changes.name && changes.name.isFirstChange()) {
      let fgParent = ((this.__parent.formDirective as IKNOWINTERNAL) as { control: FormGroup }).control;
      console.info("fgParent", fgParent);
      console.error("NON E' UN ERRORE", fgParent, "__PARENT", this.__parent);
      console.log("HO NAME E MI APPICCICO", changes.name.currentValue);
      fgParent.addControl(changes.name.currentValue, new FormControl());
    } else {
    }
    super.ngOnChanges(changes);
  }
}
