interface ContattoCommonInfo {
  nome: string;
  cognome: string;
  cf: string;
  eta: number;
}

interface ContattoInColonna extends ContattoCommonInfo {
  layout: "colonna";
}

interface ContattoConFoto extends ContattoCommonInfo {
  layout: "fotomodello";
  foto: string;
}

interface ContattoConOrdinamento extends ContattoCommonInfo {
  layout: "ordinabile";
  periodo: [Date, Date];
  numero: number;
}

interface ContattoInGriglia extends ContattoCommonInfo {
  layout: "griglia";
}

type Contatto = ContattoInColonna | ContattoConFoto | ContattoConOrdinamento | ContattoInGriglia;
/*
function xx(c: Contatto) {
  c.layout;
  if (c.layout == "fotomodello") {
    var x: ContattoConFoto;
    x.foto = c.foto;
    x = c;
  }
}
*/
