import { InjectionToken } from "@angular/core";
export type Layouts = "EDIT" | "VIEW" | "GRID" | "WIZZARD";
export const LAYOUT_TOKEN = new InjectionToken<Layouts>("LAYOUT");
