import { Injectable, OnDestroy, InjectionToken } from "@angular/core";
import { Observable, Observer, BehaviorSubject, Subject } from "rxjs";
import { map, filter, distinctUntilChanged } from "rxjs/operators";

interface IState {
  identity: {
    id: string;
    permissions: string[];
  };
  profileId: number[];
  section: string;
  menu: string;
  submenu: string;
  appcontext: string;
}

/*
type pippo = IState["identity"]
type kkk = keyof IState;
type xxx = { [k in kkk]: number};
type CopyT<T> = { [K in keyof T]?: Nullable<T[K]> }
type ccc = CopyT<IState>
*/

const LOCALSTORAGEKEY = "APPSTATE_DURABLE";
const obsFromBs = <T>(bs: BehaviorSubject<T | undefined | null>) =>
  bs.asObservable().pipe(filter(x => x !== undefined)) as Observable<T | null>;

type Nullable<T> = T | null;
type PartialNull<T> = { [K in keyof T]?: T[K] | null };

@Injectable({
  providedIn: "root"
})
export class StateService implements OnDestroy {
  //STATE "PRIVATE VARIABLES Observables" --> BehaviorSubject
  private identity: BehaviorSubject<Nullable<IState["identity"]>>;
  private section: BehaviorSubject<Nullable<IState["section"]>>;
  private profileId: BehaviorSubject<Nullable<IState["profileId"]>>;

  constructor() {
    //EVENTUALI DEFAULT
    const defaultState: Partial<IState> = {
      menu: "123"
    };

    //LOGICA DI DE-HIDRATATE DELLO STATO (Leggo dal localStorage)
    const initState: IState = Object.assign(
      defaultState,
      JSON.parse(window.localStorage.getItem(LOCALSTORAGEKEY) || "{}")
    );

    this.identity = new BehaviorSubject(initState.identity);
    this.section = new BehaviorSubject(initState.section);
    this.profileId = new BehaviorSubject(initState.profileId);
  }

  private _destroy$ = new Subject<void>();
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();

    //SERILIZE STATE
    const state: PartialNull<IState> = {
      identity: this.identity.getValue(),
      section: this.section.getValue()
    };

    window.localStorage.setItem(LOCALSTORAGEKEY, JSON.stringify(state));
  }

  setToken_Login(token: string, permissions: []) {
    this.identity.next({
      id: token,
      permissions
    });
  }

  setToken_Logout() {
    this.identity.next(null);
    this.section.next(null);
  }

  getIdentity$(): Observable<Nullable<IState["identity"]>> {
    return obsFromBs(this.identity);
  }

  getIdentityToken$(): Observable<IState["identity"]["id"]> {
    return this.getIdentity$().pipe(
      filter(x => x !== null),
      //map(x => x as NonNullable<IState["identity"]>),
      map(x => (x && x.id) || ""),
      distinctUntilChanged()
    );
  }

  getSection$(): Observable<Nullable<IState["section"]>> {
    return obsFromBs(this.section);
  }

  currIdenity(): Nullable<IState["identity"]> {
    return this.identity.getValue();
  }

  currSection(): Nullable<IState["section"]> {
    return this.section.getValue();
  }
}
