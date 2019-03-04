export type IRecapito =
  | {
      uguaglio: true;
    }
  | {
      uguaglio: false;
      recapito: IAddress;
    };
