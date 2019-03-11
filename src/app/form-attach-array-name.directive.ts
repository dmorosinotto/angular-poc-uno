import { Directive, SkipSelf, Optional, Self, Inject, forwardRef, Input, OnInit, SimpleChanges } from "@angular/core";
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
  FormControl,
  FormArrayName
} from "@angular/forms";

@Directive({
  selector: "[formAttachArrayName]",
  providers: [{ provide: ControlContainer, useExisting: forwardRef(() => FormAttachArrayNameDirective) }]
})
export class FormAttachArrayNameDirective extends FormArrayName implements OnInit {
  constructor(
    @Optional() @SkipSelf() __parent: ControlContainer,
    @Optional() @Self() @Inject(NG_VALIDATORS) validators: any[],
    @Optional() @Self() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: any[]
  ) {
    super(__parent, validators, asyncValidators);
    console.warn("ARRAY PAPI", __parent);
  }

  fgParent: FormGroup;

  @Input("formAttachArrayName") name: string;

  ngOnInit(): void {
    this.formDirective!.addFormArray(this);
  }
}
