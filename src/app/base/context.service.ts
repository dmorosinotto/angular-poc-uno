import { Injectable, OnDestroy, InjectionToken } from "@angular/core";
import { Observable, Observer, BehaviorSubject, Subject } from "rxjs";
import { takeUntil, filter } from "rxjs/operators";

@Injectable()
export class ContextService implements OnDestroy {
  private _destroy$ = new Subject<void>();
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    //cleanup internals I don't know if it's safer to execute this in nextTick Promise.resolve().then()
    for (let _key in this._) (this._[_key] as unknown) = undefined;
  }

  private _: {
    //internals use an object map string -> BehaviorSubject (ndr token -> reactive variable)
    [_key: string]: BehaviorSubject<unknown | undefined>;
  } = {};

  provide<T>(key: string | InjectionToken<T>, initVal?: T): Observer<T> {
    const _key = key.toString();
    if (!(_key in this._)) this._[_key] = new BehaviorSubject<T | undefined>(initVal);
    else this._[_key].next(initVal); //if no initVal is passed it emits undefined but it's filtered

    const _bs = this._[_key];
    return {
      next: _bs.next.bind(_bs),
      error: _bs.error.bind(_bs),
      complete: _bs.complete.bind(_bs)
    };
  }

  get$<T>(key: string | InjectionToken<T>): Observable<T> {
    const _key = key.toString();
    if (!(_key in this._)) this._[_key] = new BehaviorSubject<T | undefined>(undefined);

    return (this._[_key].asObservable() as Observable<T>).pipe(
      filter(t => t !== undefined), //filter the initial undefined, or possible initVal not passed
      takeUntil(this._destroy$)
    );
  }
}
