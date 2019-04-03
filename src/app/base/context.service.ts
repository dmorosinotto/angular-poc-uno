import { Injectable, OnDestroy } from "@angular/core";
import { Observable, Observer, BehaviorSubject, Subject } from "rxjs";
import { takeUntil, filter } from "rxjs/operators";
import { InjectionToken } from "@angular/core";

@Injectable()
export class ContextService implements OnDestroy {
  private _destroy$ = new Subject<void>();
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    //cleanup internals (I don't know if it's safer to execute this in next tick using Promise.resolve().then( ()=>for...)
    for (let _key in this._) (this._[_key] as unknown) = undefined;
  }

  private _: {
    [_key: string]: BehaviorSubject<unknown | undefined>;
  } = {};

  provide<T>(key: string | InjectionToken<T>, initVal?: T): Observer<T> {
    const _key = key.toString();
    if (!(_key in this._)) this._[_key] = new BehaviorSubject<T | undefined>(initVal);
    else this._[_key].next(initVal); //if no initVal is passed it emit undefined but it's filtered in the get$ ;-)

    return {
      next: this._[_key].next,
      error: this._[_key].error,
      complete: this._[_key].complete
    };
  }

  get$<T>(key: string | InjectionToken<T>): Observable<T> {
    const _key = key.toString();
    if (!(_key in this._)) this._[_key] = new BehaviorSubject<T | undefined>(undefined);
    return (this._[_key].asObservable() as Observable<T>).pipe(
      filter(t => t !== undefined), //filter the initial undefined, or possible initVal not passed (ndr undefined)
      takeUntil(this._destroy$)
    );
  }
}
