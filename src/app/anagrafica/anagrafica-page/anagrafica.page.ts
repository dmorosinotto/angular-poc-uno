import { Component, OnInit } from "@angular/core";
import { APIDataService } from "../../_DAL/apidata.service";
import { takeUntil, distinctUntilChanged } from "rxjs/operators";
import { FormGroup, FormControl, FormArray, ValidationErrors } from "@angular/forms";
import { BaseComponent } from "@base/base.component";
import { delay, tap } from "rxjs/operators";
@Component({
  //selector: "app-anagrafica-page",
  templateUrl: "anagrafica.page.html",
  styles: ["*.ng-invalid {border: 2px red solid; padding-left: 5px}", "*.ng-valid {border: 2px green solid}"]
})
export class AnagraficaPage extends BaseComponent implements OnInit {
  dto: IAnagrafica;
  frm: FormGroup;
  constructor(private svc: APIDataService) {
    super();
    this.frm = new FormGroup({
      residenza: new FormControl(null),
      spedizione: new FormControl(null, this.validRecapito),
      referente: new FormControl(null),
      //amici: new FormArray([])
      XXX: new FormControl(null),
      coniuge: new FormGroup({
        sposato: new FormControl(false)
      }),
      data: new FormControl(null),
      cf: new FormControl(null),
      amicici: new FormArray([]),
      friends: new FormControl(null)
    });
    this.frm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((val: any) => {
      console.log("FRM", val);
      //Promise.resolve().then(() => (this.frmValue = val));
    });
  }

  //frmValue;
  Load() {
    this.svc
      .getAnagrafica()
      .pipe(
        //delay(0),
        tap(data => (this.dto = data))
      )
      //.pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.frm.patchValue(data);
      });
  }

  Save() {
    console.log("SEND TO SERVER", this.frm.value);
  }

  refresh() {
    console.log("REFRESH");
  }

  validRecapito(ctrl: AbstractControl): ValidationErrors {
    if (ctrl && ctrl.value && ctrl.value.uguaglio) return null;
    else return { recapito: "INVALIDO PERCHE DEVE ESSERE UGUAGLIO" };
  }

  ngOnInit() {}
}
