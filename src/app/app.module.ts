import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AnagraficaContainerComponent } from "./anagrafica-container/anagrafica-container.component";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { NominativoFldComponent } from "./nominativo-fld/nominativo-fld.component";
import { AddressFrmComponent } from "./address-frm/address-frm.component";
import { NameFrmComponent } from "./name-frm/name-frm.component";
import { AmiciArrComponent } from "./amici-arr/amici-arr.component";
import { FormAttachNameDirective } from "./form-attach-name.directive";
import { UiTextboxComponent } from "./ui-textbox/ui-textbox.component";
import { RecapitoFrmComponent } from "./recapito-frm/recapito-frm.component";
import { UiDateTimeComponent } from "./ui-datetime/ui-datetime.component";
import { UiCodfiscComponent } from './ui-codfisc/ui-codfisc.component';
import { AllErrorsPipe } from './all-errors.pipe';
@NgModule({
  declarations: [
    AppComponent,
    AnagraficaContainerComponent,
    NominativoFldComponent,
    AddressFrmComponent,
    NameFrmComponent,
    AmiciArrComponent,
    FormAttachNameDirective,
    UiTextboxComponent,
    RecapitoFrmComponent,
    UiDateTimeComponent,
    UiCodfiscComponent,
    AllErrorsPipe
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
  //entryComponents: [NameFrmComponent]
})
export class AppModule {}
