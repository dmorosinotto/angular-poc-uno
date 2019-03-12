import { Pipe, PipeTransform } from "@angular/core";
import { FormGroup, FormArray, ValidationErrors } from "@angular/forms";

@Pipe({
  name: "allerr",
  pure: false
})
export class AllErrorsPipe implements PipeTransform {
  transform(value: FormControl | FormGroup | FormArray): flatErr[] {
    return aggregateErrors(value);
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

export function aggregateErrors(
  ctrl: FormControl | FormGroup | FormArray | AbstractControl,
  path: string = "" //BASE PATH TO TRAVERSE DATA STRUCTURE
): flatErr[] {
  let errs: flatErr[] = [];
  if (ctrl.errors) errs.push({ path, err: ctrl.errors }); //ERRORI-VALIDATORI A LIVELLO DI CTRL
  if (ctrl instanceof FormArray) {
    for (let idx = 0; idx < ctrl.length; idx++) {
      if (!ctrl.at(idx).valid) errs.push(...aggregateErrors(ctrl.at(idx), (path ? path + "." : "") + idx));
    }
    return errs;
  } else {
    if (ctrl.valid) return [];
    else {
      if ("controls" in ctrl) {
        // SONO SU FormGroup | FormArray -> VADO IN RICORSIONE
        for (let key in ctrl.controls) {
          if (ctrl.controls[key] && !ctrl.controls[key].valid)
            //SE IL CHILD (Prop|Index) E' INVALIDO -> RICORSIONE
            errs.push(...aggregateErrors(ctrl.controls[key], (path ? path + "." : "") + key));
        }
      }
      return errs;
    }
  }
}
