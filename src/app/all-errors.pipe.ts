import { Pipe, PipeTransform } from "@angular/core";
import { FormGroup, FormArray, ValidationErrors } from "@angular/forms";

@Pipe({
  name: "allerr",
  pure: false
})
export class AllErrorsPipe implements PipeTransform {
  transform(value: FormControl | FormGroup | FormArray): flatErr[] {
    return allErrors(value);
  }
}

interface flatErr {
  path: string; //doted path to the control invalid
  err: ValidationErrors; //control.errors != null
}
/*
interface IdealValidatorErrors {
  [errCode: string]: { msg: string, [errDetails: string]: unknown }
}
*/

export function allErrors(ctrl: FormControl | FormGroup | FormArray, path: string = ""): flatErr[] {
  let errs: flatErr[] = [];
  if (ctrl.valid) return [];
  else {
    if (ctrl.errors) errs.push({ path, err: ctrl.errors }); //ERRORI-VALIDATORI A LIVELLO DI FORM GROUP
    if ("controls" in ctrl) {
      // SONO SU FormGroup | FormArray -> VADO IN RICORSIONE
      for (let key in ctrl.controls) {
        if (ctrl.controls[key] && !ctrl.controls[key].valid)
          //SE IL CHILD (Prop|Index) E' INVALIDO -> RICORSIONE
          errs.push(...allErrors(ctrl.controls[key], (path ? path + "." : "") + key));
      }
    }
    return errs;
  }
}
