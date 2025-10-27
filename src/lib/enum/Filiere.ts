export enum Filiere {
    Generale = 0,
    Medecine = 1,
    ChirurgieDentaire = 2,
    Osteopathie = 3,
    Kine = 4,
    Paramedicale = 5,
    SoinsInfirmiers = 6,
    Pharmacie = 7,
    PASS_LASS = 8,
    PrepaSante = 9,
    SageFemme = 10,
    Veterinaire = 11,
    AES = 12,
    Droit = 13,
    Architecture = 14,
    Arts = 15,
    Cinema = 16,
    CoutureMode = 17,
    Theatre = 18,
    BTS = 19,
    CPGE = 20,
    ENS = 21,
    INSPE = 22,
    IUT = 23,
    Anthropologie = 24,
    Archeologie = 25,
    ArtsSpectacle = 26,
    Communication = 27,
    Evenementiel = 28,
    Geographie = 29,
    Histoire = 30,
    HistoireArt = 31,
    LettresLangues = 32,
    Philosophie = 33,
    Psychologie = 34,
    Psychopraticien = 35,
    SciencesEducation = 36,
    Sociologie = 37,
    Musique = 38,
    Oenologie = 39,
    Sciences = 40,
    SciencesEcoGestion = 41,
    STAPS = 42,
    EcolesCommerce = 43,
    EcolesNotariat = 44,
    EcolesIngenieur = 45,
    SciencesPolitiques = 46,
    UniversiteCatholique = 47,
    MedLyonEst = 48,
    MedLyonSud = 49,
    LSH = 50,
    SEC = 51,
}

export function toStringFiliere(filiere: Filiere): string {
    switch (filiere) {
        case Filiere.Generale: return "Générale";
        case Filiere.Medecine: return "Médecine";
        case Filiere.ChirurgieDentaire: return "Chirurgie Dentaire";
        case Filiere.Osteopathie: return "Ostéopathie";
        case Filiere.Kine: return "Kinésithérapie";
        case Filiere.Paramedicale: return "Paramédicale";
        case Filiere.SoinsInfirmiers: return "Soins Infirmiers";
        case Filiere.Pharmacie: return "Pharmacie";
        case Filiere.PASS_LASS: return "PASS / L.AS";
        case Filiere.PrepaSante: return "Prépa Santé";
        case Filiere.SageFemme: return "Sage-Femme";
        case Filiere.Veterinaire: return "Vétérinaire";
        case Filiere.AES: return "AES";
        case Filiere.Droit: return "Droit";
        case Filiere.Architecture: return "Architecture";
        case Filiere.Arts: return "Arts";
        case Filiere.Cinema: return "Cinéma";
        case Filiere.CoutureMode: return "Couture / Mode";
        case Filiere.Theatre: return "Théâtre";
        case Filiere.BTS: return "BTS";
        case Filiere.CPGE: return "CPGE";
        case Filiere.ENS: return "ENS";
        case Filiere.INSPE: return "INSPE";
        case Filiere.IUT: return "IUT";
        case Filiere.Anthropologie: return "Anthropologie";
        case Filiere.Archeologie: return "Archéologie";
        case Filiere.ArtsSpectacle: return "Arts du spectacle";
        case Filiere.Communication: return "Communication";
        case Filiere.Evenementiel: return "Événementiel";
        case Filiere.Geographie: return "Géographie";
        case Filiere.Histoire: return "Histoire";
        case Filiere.HistoireArt: return "Histoire de l’art";
        case Filiere.LettresLangues: return "Lettres / Langues";
        case Filiere.Philosophie: return "Philosophie";
        case Filiere.Psychologie: return "Psychologie";
        case Filiere.Psychopraticien: return "Psychopraticien";
        case Filiere.SciencesEducation: return "Sciences de l’éducation";
        case Filiere.Sociologie: return "Sociologie";
        case Filiere.Musique: return "Musique";
        case Filiere.Oenologie: return "Œnologie";
        case Filiere.Sciences: return "Sciences";
        case Filiere.SciencesEcoGestion: return "Sciences Éco / Gestion";
        case Filiere.STAPS: return "STAPS";
        case Filiere.EcolesCommerce: return "Écoles de commerce";
        case Filiere.EcolesNotariat: return "Écoles de notariat";
        case Filiere.EcolesIngenieur: return "Écoles d’ingénieur";
        case Filiere.SciencesPolitiques: return "Sciences Politiques";
        case Filiere.UniversiteCatholique: return "Université Catholique";
        case Filiere.MedLyonEst: return "Médecine Lyon Est";
        case Filiere.MedLyonSud: return "Médecine Lyon Sud";
        case Filiere.LSH: return "Lettres et Sciences Humaines (LSH)";
        case Filiere.SEC: return "Sciences Économiques et Commerciales (SEC)";
        default: return "Inconnue";
    }
}
