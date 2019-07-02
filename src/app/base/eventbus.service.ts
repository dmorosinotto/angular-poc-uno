import { Injectable, OnDestroy, InjectionToken } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class EventBusService implements OnDestroy {
  private _evts: {
    //internals use an object map string -> Subject (ndr token -> reactive variable)
    [_key: string]: Subject<unknown>;
  } = {};
  ngOnDestroy(): void {
    //cleanup internals I don't know if it's safer to execute this in nextTick Promise.resolve().then()
    for (let _key in this._evts) {
      this._evts[_key].complete();
      (this._evts[_key] as unknown) = undefined;
    }
  }

  dispatch<T>(eventName: InjectionToken<T>, eventPayload: T): void {
    const _key = eventName.toString();
    if (!(_key in this._evts)) this._evts[_key] = new Subject<T>();

    this._evts[_key].next(eventPayload); //simply emit the event throught the Subject
  }

  handleEvent$<T>(eventName: InjectionToken<T>, destroy$: Observable<void>): Observable<T> {
    const _key = eventName.toString();
    if (!(_key in this._evts)) this._evts[_key] = new Subject<T>();

    return (this._evts[_key].asObservable() as Observable<T>).pipe(takeUntil(destroy$));
  }
}

export const eventRELOAD = new InjectionToken<void>("RELOAD");
export const eventWITHDATA = new InjectionToken<{ name: string; age: number }>("DATA");

var destroy$ = new Subject<void>();
var bus = new EventBusService();
bus.dispatch(eventRELOAD, void 0);
bus.dispatch(eventWITHDATA, { name: "pippo", age: 42 });
bus.handleEvent$(eventWITHDATA, destroy$).subscribe(e => {
  console.log(e.name, e.age);
});
