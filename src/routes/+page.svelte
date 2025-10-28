<script lang="ts">
    import insignes from "$lib/data/insignes.json";
    import type {Insigne} from "$lib/entity/Insigne.ts";

    import {Filiere, toStringFiliere} from "$lib/enum/Filiere.js";
    import {Categorie, toStringCategorie} from "$lib/enum/Categorie.js";
    import {Localisation, localisationToString} from "$lib/enum/Localisation.js";

    let hovered: Insigne | null = null;

    let groupByLetter = false;
    let selectedFiliere: Filiere | "all" = "all";
    let selectedCategorie: Categorie | "all" = "all";
    let selectedLocalisation: Localisation | "all" = "all";
    let sortBy: "nom" | "filiere" | "categorie" | "localisation" = "nom";
    let searchQuery = "";

    $: filteredInsignes = insignes
        .filter(i => selectedFiliere === "all" || i.filiere === selectedFiliere)
        .filter(i => selectedCategorie === "all" || i.categories.includes(selectedCategorie))
        .filter(i => selectedLocalisation === "all" || i.localisation === selectedLocalisation)
        .filter(i => i.nom.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
            switch (sortBy) {
                case "filiere":
                    return toStringFiliere(a.filiere).localeCompare(toStringFiliere(b.filiere));
                case "categorie":
                    return toStringCategorie(a.categories[0]).localeCompare(toStringCategorie(b.categories[0]));
                case "localisation":
                    return localisationToString(a.localisation).localeCompare(localisationToString(b.localisation));
                default:
                    return a.nom.localeCompare(b.nom);
            }
        });

    $: groupedInsignes = filteredInsignes.reduce((acc, insigne) => {
        const firstLetter = insigne.nom[0]?.toUpperCase() || "#";
        if (!acc[firstLetter]) acc[firstLetter] = [];
        acc[firstLetter].push(insigne);
        return acc;
    }, {} as Record<string, Insigne[]>);

    function resetFilters() {
        selectedFiliere = "all";
        selectedCategorie = "all";
        selectedLocalisation = "all";
        sortBy = "nom";
        searchQuery = "";
    }

    function truncate(text: string, max: number) {
        return text.length > max ? text.slice(0, max) + "…" : text;
    }
</script>

<div class="flex flex-col h-screen bg-gray-50">
    <header class="bg-white shadow-sm p-4 flex flex-wrap items-center gap-4 border-b border-gray-200 sticky top-0 z-10">
        <h1 class="text-xl font-semibold flex-1">Insignes</h1>

        <input
                type="text"
                placeholder="Rechercher..."
                bind:value={searchQuery}
                class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48 sm:w-64"
        />

        <select bind:value={groupByLetter} class="border border-gray-300 rounded-md px-2 py-1 text-sm">
            <option value={false}>Affichage simple</option>
            <option value={true}>Regrouper par lettre</option>
        </select>

        <select
                bind:value={selectedFiliere}
                class="border border-gray-300 rounded-md px-2 py-1 text-sm max-w-[160px]"
        >
            <option value="all">Toutes Filières</option>
            {#each Object.values(Filiere) as f (f)}
                {#if typeof f === "number"}
                    <option value={f}>
                        {truncate(toStringFiliere(f), 20)}
                    </option>
                {/if}
            {/each}
        </select>

        <select bind:value={selectedCategorie} class="border border-gray-300 rounded-md px-2 py-1 text-sm">
            <option value="all">Toutes Catégories</option>
            {#each Object.values(Categorie) as c (c)}
                {#if typeof c === "number"}
                    <option value={c}>{toStringCategorie(c)}</option>
                {/if}
            {/each}
        </select>

        <select bind:value={selectedLocalisation} class="border border-gray-300 rounded-md px-2 py-1 text-sm">
            <option value="all">Toutes Localisations</option>
            {#each Object.values(Localisation) as l (l)}
                {#if typeof l === "number"}
                    <option value={l}>{localisationToString(l)}</option>
                {/if}
            {/each}
        </select>

        <select bind:value={sortBy} class="border border-gray-300 rounded-md px-2 py-1 text-sm">
            <option value="nom">Trier par Nom</option>
            <option value="filiere">Trier par Filière</option>
            <option value="categorie">Trier par Catégorie</option>
            <option value="localisation">Trier par Localisation</option>
        </select>

        <button
                on:click={resetFilters}
                class="ml-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300 transition"
        >
            Réinitialiser
        </button>
    </header>

    <main class="flex-1 flex overflow-hidden">
        <aside class="w-80 bg-white border-l border-gray-200 p-5 overflow-y-auto hidden md:block">
            {#if hovered}
                <div class="animate-in fade-in slide-in-from-right-2">
                    <div class="flex flex-col items-center text-center mb-4">
                        {#if hovered.image}
                            <img src={hovered.image} alt={hovered.nom} class="w-24 h-24 object-contain mb-3"/>
                        {/if}
                        <h2 class="text-lg font-semibold text-gray-800 mb-1">{hovered.nom}</h2>
                        <p class="text-sm text-gray-600 italic">{hovered.description}</p>
                    </div>

                    <div class="text-sm text-gray-700 space-y-2">
                        <p><span
                                class="font-medium text-gray-900">Catégories :</span> {hovered.categories.map(toStringCategorie).join(", ")}
                        </p>
                        <p><span
                                class="font-medium text-gray-900">Localisation :</span> {localisationToString(hovered.localisation)}
                        </p>
                        <p><span class="font-medium text-gray-900">Filière :</span> {toStringFiliere(hovered.filiere)}
                        </p>
                    </div>
                </div>
            {:else}
                <div class="h-full flex items-center justify-center text-gray-400 italic text-sm text-center px-4">
                    Survolez une insigne pour voir les détails
                </div>
            {/if}
        </aside>

        <div class="flex-1 overflow-y-auto p-6">
            <div class="mb-6 flex items-center justify-between">
                <span class="text-sm text-gray-600">{filteredInsignes.length} insigne(s) trouvée(s)</span>
            </div>

            {#if groupByLetter}
                {#each Object.keys(groupedInsignes).sort() as letter}
                    <h2 class="text-xl font-semibold text-gray-800 mt-10 mb-4 border-b border-gray-200 pb-1">{letter}</h2>

                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
                        {#each groupedInsignes[letter] as insigne}
                            <button
                                    type="button"
                                    on:mouseenter={() => hovered = insigne}
                                    on:mouseleave={() => hovered = null}
                                    class="flex flex-col items-center bg-white rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all p-4 cursor-pointer focus:outline-none"
                            >
                                {#if insigne.image}
                                    <img src={insigne.image} alt={insigne.nom} class="w-16 h-16 object-contain mb-2"/>
                                {:else}
                                    <div class="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-2 text-gray-500 font-medium">
                                        {insigne.nom[0]}
                                    </div>
                                {/if}
                                <span class="text-sm text-gray-700 font-medium text-center truncate w-full block"
                                      title={insigne.nom}>
                        {insigne.nom}
                    </span>
                            </button>
                        {/each}
                    </div>
                {/each}
            {:else}
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
                    {#each filteredInsignes as insigne}
                        <button
                                type="button"
                                on:mouseenter={() => hovered = insigne}
                                on:mouseleave={() => hovered = null}
                                class="flex flex-col items-center bg-white rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all p-4 cursor-pointer focus:outline-none"
                        >
                            {#if insigne.image}
                                <img src={insigne.image} alt={insigne.nom} class="w-16 h-16 object-contain mb-2"/>
                            {:else}
                                <div class="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-2 text-gray-500 font-medium">
                                    {insigne.nom[0]}
                                </div>
                            {/if}
                            <span class="text-sm text-gray-700 font-medium text-center truncate w-full block"
                                  title={insigne.nom}>
                    {insigne.nom}
                </span>
                        </button>
                    {/each}
                </div>
            {/if}
        </div>
    </main>
</div>
