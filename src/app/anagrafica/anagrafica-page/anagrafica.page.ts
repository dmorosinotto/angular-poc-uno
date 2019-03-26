import { Component, OnInit, InjectionToken } from "@angular/core";
import { APIDataService } from "../../_DAL/apidata.service";
import { takeUntil, distinctUntilChanged, map } from "rxjs/operators";
import { FormGroup, FormControl, FormArray, ValidationErrors } from "@angular/forms";
import { BaseComponent } from "@base/base.component";
import { delay, tap } from "rxjs/operators";
import { LAYOUT_TOKEN, Layouts } from "@base/LayoutToken";
import { ContextService } from "@base/context.service";

export const CODFISC_TOKEN = new InjectionToken<string>("CODFISC");
export const PROVLIST_TOKEN = new InjectionToken<IProvincia[]>("PROVLIST");

@Component({
  //selector: "app-anagrafica-page",
  templateUrl: "anagrafica.page.html",
  styles: [
    "*.ng-invalid {border-left: 4px red solid; padding-left: 8px}",
    "*.ng-valid {border-left: 4px green solid; padding-left: 2px}"
  ],
  providers: [
    { provide: LAYOUT_TOKEN, useValue: "GRID" as Layouts },
    ContextService //EQUIVALE A  { provide: ContextService, useClass: ContextService}
  ]
})
export class AnagraficaPage extends BaseComponent implements OnInit {
  dto: IAnagrafica;
  frm: FormGroupTyped<IAnagrafica>;
  constructor(private svc: APIDataService, private ctx: ContextService) {
    super();
    this.frm = new FormGroup({
      residenza: new FormControl(null),
      spedizione: new FormControl(null, this.validRecapito),
      referente: new FormControl(null),
      //amici: new FormArray([])
      XXX: new FormControl(null),
      coniuge: new FormGroup({
        sposato: new FormControl(false),
        codfisc: new FormControl("")
      }),
      data: new FormControl(null),
      cf: new FormControl(null),
      amicici: new FormArray([]),
      friends: new FormControl(null)
    }) as FormGroupTyped<IAnagrafica>;
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
        tap(data => (this.dto = data)),
        map(data => {
          //LOGICA RIMAPPATURA DTO -> struttura x Form
          const lookupData = (arr: IFullname[], name: string) => {
            var found = arr.find(x => x.name === name);
            console.log("FOUND", found, name);
            return (found && found.surname) || "NOT FOUND";
          };
          data.friends = data.friends.map(amico => {
            amico.dato = lookupData(data.XXX.amici, amico.name);
            return amico;
          });
          data.coniuge.codfisc = lookupData(data.friends, data.coniuge.nome);
          return data;
        })
      )
      //.pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        console.warn("DOPO LA MAP", data);
        this.frm.patchValue(data);
        //ESEMPIO DI PROVIDER DI codfiscale
        //this.ctx.provide<string>("codfiscale", this)
        this.setCODFISC.next(data.cf); //E' INUTILE PERCHE? LO FA IL CODICE DI valueChanges QUI SOTTO
      });
    //LOAD DEL LOOKUP DELLE PROVICE
    this.svc.getProvList().subscribe(this.ctx.provide(PROVLIST_TOKEN));
    this.frm.controls["cf"].valueChanges.pipe(takeUntil(this.destroy$)).subscribe(x => this.setCODFISC.next(x));
  }
  private setCODFISC = this.ctx.provide(CODFISC_TOKEN);

  Save() {
    console.log("SEND TO SERVER", this.frm.value);
  }

  refresh() {
    console.log("REFRESH");
  }

  validRecapito(ctrl: AbstractControl): ValidationErrors | null {
    if (ctrl && ctrl.value && ctrl.value.uguaglio) return null;
    else return { recapito: "INVALIDO PERCHE DEVE ESSERE UGUAGLIO" };
  }

  ngOnInit() {}
}
