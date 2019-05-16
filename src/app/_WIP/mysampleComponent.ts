import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "mytable",
  template: `
        <mytable data="http.get('/api/Data')">
            <span mycol name="titolo">Titolo</span>
            <b mycol name="nome">Nome utente</b>
            <h2 mycol name="tot" style="text-align: right">Totale <img src="euro.png"></h2>
            Ciao belli come va? il <b>Corso<b>?
            <h1>Angular school of <img src="rock.jpg"></h1>
        </mytable>
    `
})
export class mySampleComponent {
  constructor(public http: HttpClients) {}
}
