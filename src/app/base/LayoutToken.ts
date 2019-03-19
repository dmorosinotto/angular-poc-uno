import { InjectionToken } from "@angular/core";
export type Layouts = ILayoutColumns | ILayoutGrid | ILayoutWizzard;
export const LAYOUT_TOKEN = new InjectionToken<Layouts>("LAYOUT");

export interface ILayoutGrid {
  type: "GRID";
  columns: number;
}

export interface ILayoutWizzard {
  type: "WIZZARD";
}

export interface ILayoutColumns {
  type: "COLUMNS";
  position: "left" | "center" | "right";
}
