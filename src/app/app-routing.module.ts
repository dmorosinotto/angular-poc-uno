import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AnagraficaPage } from "./anagrafica/anagrafica-page/anagrafica.page";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/anagrafica" },
  { path: "anagrafica", component: AnagraficaPage }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
