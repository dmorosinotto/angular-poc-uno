type Optional<T> = T | undefined | null;

declare var Contatto_DTO: {
  nome: string;
  cognome: string;
  cf?: string;
  eta: boolean;
  foto: Optional<string>;
  periodo: Optional<[Date, Date]>;
  numero: Optional<number>;
};

interface Contatto_Common {
  nome: typeof Contatto_DTO["nome"];
  cognome: typeof Contatto_DTO["cognome"];
  cf?: typeof Contatto_DTO["cf"];
  eta: typeof Contatto_DTO["eta"];
  //INCLUDE ALL "UNION" PROPS FOR ALL CASES WITH unknown
  foto: unknown;
  periodo: unknown;
  numero: unknown;
}

interface ContattoInColonna extends Contatto_Common {
  layout: "colonna";
  //ESCLUDE PROP NEVER USED IN THIS CASES
  foto: never;
  periodo: never;
  numero: never;
}

interface ContattoConFoto extends Contatto_Common {
  layout: "fotomodello";
  //OVVERRIDE THE TYPE OF CASE-SPECIFIC PROP WITH OPTIONAL!
  foto: typeof Contatto_DTO["foto"];
  //ESCLUDE PROP NEVER USED IN THIS CASES
  periodo: never;
  numero: never;
}

interface ContattoConOrdinamento extends Contatto_Common {
  layout: "ordinabile";
  //OVVERRIDE THE TYPE OF CASE-SPECIFIC PROP WITH OPTIONAL!
  periodo: typeof Contatto_DTO["periodo"];
  numero: typeof Contatto_DTO["numero"];
  //ESCLUDE PROP NEVER USED IN THIS CASES
  foto: never;
}

interface ContattoInGriglia extends Contatto_Common {
  layout: "griglia";
  //ESCLUDE PROP NEVER USED IN THIS CASES
  foto: typeof Contatto_DTO["foto"];
  periodo: never;
  numero: never;
}

type Contatto = ContattoInColonna | ContattoConFoto | ContattoConOrdinamento | ContattoInGriglia;

/*
function testContatto(c: Contatto) {
  c.eta
  c.layout; //0"colonna" | "ordinabile" | "fotomodello" | "griglia"
  if (c.layout=="griglia") {
    c.foto = 123
  }
  c.nome.toLocaleUpperCase(); //OK
  c.cf && c.cf.toLowerCase(); //possible undefined must check! c.cf &&
  c.foto.charAt(1); //errore null|undefined YESSS!!!!
  if (c.layout == "fotomodello") {
    var x: ContattoConFoto;
    x = c;
    x.periodo = [new Date()]; //errore NEVER campi non validi
    x.foto = c.foto;
    x.foto!.charAt(1); //FACCIO OVVERRIDE STRICT I KNOW MORE!
  } else if (c.layout == "ordinabile") {
    c.numero = 123;
    c.numero.toExponential(); //OK
    c.foto = "123"; //errore NEVER cmapi non validi!
  } else if (c.layout == "griglia") {
    c.foto = "123"; //errore String -> not assignable number
    c.foto = 123; //MOSTRO!!!
  }
}
*/
