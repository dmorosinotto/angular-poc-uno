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
import { FormAttachArrayNameDirective } from "./form-attach-array-name.directive";
import { FormAttachNameDirective } from "./form-attach-name.directive";
import { UiTextboxComponent } from "./ui-textbox/ui-textbox.component";
import { RecapitoFrmComponent } from "./recapito-frm/recapito-frm.component";
import { UiDateTimeComponent } from "./ui-datetime/ui-datetime.component";
import { UiCodfiscComponent } from "./ui-codfisc/ui-codfisc.component";
import { AllErrorsPipe } from "./all-errors.pipe";
import { AmiciciArrComponent } from "./amicici-arr/amicici-arr.component";
import { FriendsArrComponent } from "./friends-arr/friends-arr.component";
import { IvanoFrmComponent } from "./ivano-frm.component";
import { XxxFrmComponent } from "./xxx-frm/xxx-frm.component";
import { FormArrayComponent } from "./form-array/form-array.component";
import { BaseArrComponent } from "./base-arr/base-arr.component";
@NgModule({
  declarations: [
    AppComponent,
    AnagraficaContainerComponent,
    NominativoFldComponent,
    AddressFrmComponent,
    NameFrmComponent,
    AmiciArrComponent,
    FormAttachNameDirective,
    FormAttachArrayNameDirective,
    UiTextboxComponent,
    RecapitoFrmComponent,
    UiDateTimeComponent,
    UiCodfiscComponent,
    AllErrorsPipe,
    AmiciciArrComponent,
    FriendsArrComponent,
    IvanoFrmComponent,
    XxxFrmComponent,
    FormArrayComponent
  ],
  entryComponents: [NameFrmComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
  //entryComponents: [NameFrmComponent]
})
export class AppModule {}
