import { Component, OnInit, Input } from '@angular/core';

interface ISuggest{id: number, suggest: string}

@Component({
  selector: 'app-autosuggest',
  template: `
  <ng-container *ngIf="obs$ | async as dto">
    <p>{{ dto }}.text</p>
    <img *ngIf="{{ img$ | async as IMMAGINE }}?.src" [src]="IMMAGINE.src">
    <ul><li>{{ dto | uppecase }}</li></ul>
    <pre>{{ dto | json }}
    <input (input)="utenteCambia($event)">
  </ng-container>
  `,
  styles: []
})
export class AutosuggestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() cbSearch: (txt: string) => Observable<ISuggest[]>
  private _currList: ISuggest[]

  @Ouput() Selected = new EventEmitter(id: number, list: ISuggest[])

}


class parentCmp {
  searchByCognome(cognome: string) {
    return http.get<{id: number, suggest: string, nome: string, cf: boolean}>("/api/search/cognome?" + cognome)

  }

  handleSelectedCognome(sel: {id: number, suggest: string, nome: string, cf: boolean}){
    if (sel!=null) {
      ...ho in canna il valore
    } else {
      //DEVO GESTERI IL NEW
      this.frm.Cognome.value <-- "valore nuovo testuale inserito dall'utente"
    }
  }
}



