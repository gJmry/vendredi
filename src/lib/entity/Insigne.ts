import type {Categorie} from "$lib/enum/Categorie.js";
import type {Localisation} from "$lib/enum/Localisation.js";
import type {Filiere} from "$lib/enum/Filiere.js";

export type Insigne = {
    id: number;
    nom: string;
    categories:  Categorie[];
    description: string;
    localisation: Localisation;
    image: string;
    filiere: Filiere;
};
