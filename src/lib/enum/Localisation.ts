export enum Localisation {
    Circulaire = 0,
    PartiePerso = 1,
    RubanElu = 2,
    RubanAssociation = 3,
    RubanVille= 4,
    NoeudDeCeremonie = 5,
    Frontale = 6,
}

export function localisationToString(localisation: Localisation): string {
    switch (localisation) {
        case Localisation.Circulaire: return "Circulaire";
        case Localisation.PartiePerso: return "Partie Perso";
        case Localisation.RubanElu: return "Ruban Élu";
        case Localisation.RubanAssociation: return "Ruban Association";
        case Localisation.RubanVille: return "Ruban Ville";
        case Localisation.NoeudDeCeremonie: return "Nœud de Cérémonie";
        case Localisation.Frontale: return "Frontale";
        default: return "Inconnue";
    }
}
