export enum Categorie {
  Animaux = 0,
  AnimauxTerrestres = 1,
  AnimauxVolants = 2,
  AnimauxAquatiques = 3,
  AlcoolBoissons = 5,
  MedecineSante = 6,
  MusiqueArts = 7,
  EtudesDisciplines = 8,
  VieSentimentaleSexuelle = 9,
  NourritureGastronomie = 10,
  GeographieRegions = 11,
  HonneursDistinctions = 12,
  BlamesSanctions = 13,
  TransportVehicules = 14,
  LoisirsPassions = 15,
  VieAssociativeAdministrative = 16,
  AptitudesTraitsCaractere = 17,
  FamilleParrainage = 18,
  LettresChiffres = 19,
  OutilsObjets = 20,
  VegetauxNature = 21,
  HistoireAntiquite = 22,
}

export function toStringCategorie(categorie: Categorie): string {
  switch (categorie) {
    case Categorie.Animaux:
      return "Animaux";
    case Categorie.AnimauxTerrestres:
      return "Animaux terrestres";
    case Categorie.AnimauxVolants:
      return "Animaux volants";
    case Categorie.AnimauxAquatiques:
      return "Animaux aquatiques";
    case Categorie.AlcoolBoissons:
      return "Alcool / Boissons";
    case Categorie.MedecineSante:
      return "Médecine / Santé";
    case Categorie.MusiqueArts:
      return "Musique / Arts";
    case Categorie.EtudesDisciplines:
      return "Études / Disciplines";
    case Categorie.VieSentimentaleSexuelle:
      return "Vie sentimentale / sexuelle";
    case Categorie.NourritureGastronomie:
      return "Nourriture / Gastronomie";
    case Categorie.GeographieRegions:
      return "Géographie / Régions";
    case Categorie.HonneursDistinctions:
      return "Honneurs / Distinctions";
    case Categorie.BlamesSanctions:
      return "Blâmes / Sanctions";
    case Categorie.TransportVehicules:
      return "Transport / Véhicules";
    case Categorie.LoisirsPassions:
      return "Loisirs / Passions";
    case Categorie.VieAssociativeAdministrative:
      return "Vie associative / administrative";
    case Categorie.AptitudesTraitsCaractere:
      return "Aptitudes / Traits de caractère";
    case Categorie.FamilleParrainage:
      return "Famille / Parrainage";
    case Categorie.LettresChiffres:
      return "Lettres / Chiffres";
    case Categorie.OutilsObjets:
      return "Outils / Objets";
    case Categorie.VegetauxNature:
      return "Végétaux / Nature";
    case Categorie.HistoireAntiquite:
      return "Histoire / Antiquité";
    default:
      return "Inconnu";
  }
}
