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
  referente: {
    name: string;
    surname: string;
  };
  amici: [{ name: string; surname: string }];
}

interface IContatto {
  tipo: "cell" | "tel";
  numero: string;
}
