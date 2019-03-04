import { Component, OnInit } from "@angular/core";
import { APIDataService } from "../_DAL/apidata.service";
import { takeUntil, distinctUntilChanged } from "rxjs/operators";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import { BaseComponent } from "../base-destroy-cmp/base.component";

@Component({
  selector: "app-anagrafica-container",
  templateUrl: "anagrafica-container.html"
})
export class AnagraficaContainerComponent extends BaseComponent implements OnInit {
  dto: IAnagrafica;
  frm: FormGroup;
  constructor(private svc: APIDataService) {
    super();
    this.frm = new FormGroup({
      residenza: new FormControl(null),
      spedizione: new FormControl(null),
      referente: new FormControl(null),
      //amici: new FormArray([])
      XXX: new FormControl(null),
      coniuge: new FormGroup({
        sposato: new FormControl(false)
      })
    });
    this.frm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((val: any) => {
      console.log("FRM", val);
      Promise.resolve().then(() => (this.frmValue = val));
    });
  }

  frmValue;
  Load() {
    this.svc
      .getAnagrafica()
      //.pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.dto = data;
        this.frm.patchValue(data);
      });
  }

  Save() {
    console.log("SEND TO SERVER", this.frm.value);
  }

  ngOnInit() {}
}
