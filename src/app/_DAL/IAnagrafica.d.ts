type IRecapito = import("./IRecapito").IRecapito;
// type CFString = string;
type ISOString = string | number;
type ITipoContatto = "cell" | "tel";
type MaybeStrings = string | string[] | null | undefined;
type Nullable<T> = T | null | undefined;

interface IAnagrafica {
  residenza: IAddress;
  spedizione: {
    uguaglio: boolean;
    recapito?: IAddress;
  };
  spedizioneT: IRecapito;
  contatti: IContatto[];

  coniuge: INominativo & {
    sposato: boolean;
    codfisc?: string;
  };
  referente: IFullname;
  amicici: IFullname[];
  data: ISOString;
  cf: string;
  XXX: IXxx;
  friends: Array<IFullname & { cf?: string }>;
}

interface IContatto {
  tipo: ITipoContatto;
  numero: string;
}

interface IFullname {
  name: string;
  surname: string;
}

interface IXxx {
  amici: IFullname[];
  quanti: number;
}
