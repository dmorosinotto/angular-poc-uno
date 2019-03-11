type IRecapito = import("./IRecapito").IRecapito;

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
  };
  referente: IFullname;
  amicici: IFullname[];
  data: string;
  cf: string;
  XXX: IXxx;
}

interface IContatto {
  tipo: "cell" | "tel";
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
