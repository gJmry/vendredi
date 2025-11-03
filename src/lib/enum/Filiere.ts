export enum Filiere {
  Generale = 0,
  ChirurgieDentaire = 2,
  Osteopathie = 3,
  Paramedicale = 5,
  Pharmacie = 7,
  SageFemme = 10,
  Veterinaire = 11,
  Corpo = 12,
  IUT = 23,
  Sciences = 40,
  STAPS = 42,
  EcolesIngenieur = 45,
  UniversiteCatholique = 47,
  MedLyonEst = 48,
  MedLyonSud = 49,
  LSH = 50,
  SEC = 51,
  Santard = 52,
}

export function toStringFiliere(filiere: Filiere): string {
  switch (filiere) {
    case Filiere.Generale:
      return "Générale";
    case Filiere.ChirurgieDentaire:
      return "Chirurgie Dentaire";
    case Filiere.Osteopathie:
      return "Ostéopathie";
    case Filiere.Paramedicale:
      return "Paramédicale";
    case Filiere.Pharmacie:
      return "Pharmacie";
    case Filiere.SageFemme:
      return "Sage-Femme";
    case Filiere.Veterinaire:
      return "Vétérinaire";
    case Filiere.IUT:
      return "IUT";
    case Filiere.Sciences:
      return "Sciences";
    case Filiere.STAPS:
      return "STAPS";
    case Filiere.EcolesIngenieur:
      return "Écoles d’ingénieur";
    case Filiere.UniversiteCatholique:
      return "Université Catholique";
    case Filiere.MedLyonEst:
      return "Médecine Lyon Est";
    case Filiere.MedLyonSud:
      return "Médecine Lyon Sud";
    case Filiere.LSH:
      return "Lettres et Sciences Humaines (LSH)";
    case Filiere.SEC:
      return "Sciences Économiques et Commerciales (SEC)";
    case Filiere.Santard:
      return "Santard";
    default:
      return "Inconnue";
  }
}
