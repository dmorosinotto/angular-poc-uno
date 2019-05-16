import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AnagraficaPage } from "./anagrafica/anagrafica-page/anagrafica.page";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NominativoFldComponent } from "./anagrafica/nominativo-fld.component";
import { AddressFrmComponent } from "./anagrafica/common/address-frm.component";
import { NameFrmComponent } from "./anagrafica/common/name-frm.component";
import { AmiciArrComponent } from "./_WIP/amici-arr.component";
import { FormAttachArrayNameDirective } from "./_WIP/form-attach-array-name.directive";
import { FormAttachNameDirective } from "./base/form-attach-name.directive";
import { UiTextboxComponent } from "./toolbox/ui-textbox.component";
import { RecapitoFrmComponent } from "./anagrafica/recapito-frm.component";
import { UiDateTimeComponent } from "./toolbox/ui-datetime.component";
import { UiCodfiscComponent } from "./shared/ui-codfisc.component";
import { AllErrorsPipe } from "./base/all-errors.pipe";
import { AmiciciArrComponent } from "./anagrafica/amicici-arr.component";
import { FriendsArrComponent } from "./anagrafica/common/friends-arr.component";
import { IvanoFrmComponent } from "./_WIP/ivano-frm.component";
import { XxxFrmComponent } from "./anagrafica/xxx-frm.component";
import { FormArrayComponent } from "./base/form-array.component";
import { mycolDirective } from "./_WIP/mycolDirective";
import { mytableComponent } from "./_WIP/mytableComponent";
import { mySampleComponent } from "./_WIP/mysampleComponent";
@NgModule({
  declarations: [
    AppComponent,
    AnagraficaPage,
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
    FormArrayComponent,
    mycolDirective,
    mytableComponent,
    mySampleComponent
  ],
  entryComponents: [NameFrmComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
