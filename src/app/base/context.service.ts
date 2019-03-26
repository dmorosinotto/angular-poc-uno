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
  }
  private _: {
    [_key: string]: BehaviorSubject<unknown | undefined>;
  } = {};

  provide<T>(key: string | InjectionToken<T>, initVal?: T): Observer<T> {
    const _key = key.toString();
    if (!(_key in this._)) this._[_key] = new BehaviorSubject<T | undefined>(initVal);
    else if (initVal) this._[_key].next(initVal);

    return {
      next: x => {
        console.warn("NEXT --->", x);
        this._[_key].next(x);
        console.log("AFTER NEXT", this._[_key].value);
      },
      error: this._[_key].error,
      complete: this._[_key].complete
    };
  }

  get$<T>(key: string | InjectionToken<T>): Observable<T> {
    const _key = key.toString();
    if (!(_key in this._)) this._[_key] = new BehaviorSubject<T | undefined>(undefined);
    return (this._[_key].asObservable() as Observable<T>).pipe(
      takeUntil(this._destroy$),
      filter(t => t !== undefined)
    );
  }
}
