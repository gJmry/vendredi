<script lang="ts">
    import insignes from "$lib/data/insignes.json";
    import type {Insigne} from "$lib/entity/Insigne.ts";

    import {Filiere, toStringFiliere} from "$lib/enum/Filiere.js";
    import {Categorie, toStringCategorie} from "$lib/enum/Categorie.js";
    import {Localisation, localisationToString} from "$lib/enum/Localisation.js";

    let hovered: Insigne | null = null;
    let selectedInsigne: Insigne | null = null;
    let showFilters = false;

    let groupByLetter = true;
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
        showFilters = false;
    }

    function truncate(text: string, max: number) {
        return text.length > max ? text.slice(0, max) + "…" : text;
    }

    function openPopup(insigne: Insigne) {
        selectedInsigne = insigne;
    }

    function closePopup() {
        selectedInsigne = null;
    }
</script>

<svelte:window on:keydown={(e) => e.key === 'Escape' && closePopup()} />

<div class="flex flex-col h-screen bg-gray-50">
    <header class="bg-white shadow-sm p-3 md:p-4 border-b border-gray-200 sticky top-0 z-10">
        <div class="flex items-center gap-2 mb-3 md:mb-0">
            <h1 class="text-lg md:text-xl font-semibold flex-1">Insignes</h1>
            
            <button
                on:click={() => showFilters = !showFilters}
                class="md:hidden px-3 py-2 text-sm bg-gray-600 text-white rounded-md flex items-center gap-1"
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filtres
            </button>
        </div>

        <input
            type="text"
            placeholder="Rechercher..."
            bind:value={searchQuery}
            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
        />

        <div class="hidden md:flex flex-wrap items-center gap-3 mt-3">
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
                class="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300 transition"
            >
                Réinitialiser
            </button>
        </div>

        <!-- Panneau filtres mobile (toggle) -->
        {#if showFilters}
            <div class="md:hidden mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
                <select bind:value={groupByLetter} class="w-full border border-gray-300 rounded-md px-2 py-2 text-sm">
                    <option value={false}>Affichage simple</option>
                    <option value={true}>Regrouper par lettre</option>
                </select>

                <select
                    bind:value={selectedFiliere}
                    class="w-full border border-gray-300 rounded-md px-2 py-2 text-sm"
                >
                    <option value="all">Toutes Filières</option>
                    {#each Object.values(Filiere) as f (f)}
                        {#if typeof f === "number"}
                            <option value={f}>{toStringFiliere(f)}</option>
                        {/if}
                    {/each}
                </select>

                <select bind:value={selectedCategorie} class="w-full border border-gray-300 rounded-md px-2 py-2 text-sm">
                    <option value="all">Toutes Catégories</option>
                    {#each Object.values(Categorie) as c (c)}
                        {#if typeof c === "number"}
                            <option value={c}>{toStringCategorie(c)}</option>
                        {/if}
                    {/each}
                </select>

                <select bind:value={selectedLocalisation} class="w-full border border-gray-300 rounded-md px-2 py-2 text-sm">
                    <option value="all">Toutes Localisations</option>
                    {#each Object.values(Localisation) as l (l)}
                        {#if typeof l === "number"}
                            <option value={l}>{localisationToString(l)}</option>
                        {/if}
                    {/each}
                </select>

                <select bind:value={sortBy} class="w-full border border-gray-300 rounded-md px-2 py-2 text-sm">
                    <option value="nom">Trier par Nom</option>
                    <option value="filiere">Trier par Filière</option>
                    <option value="categorie">Trier par Catégorie</option>
                    <option value="localisation">Trier par Localisation</option>
                </select>

                <button
                    on:click={resetFilters}
                    class="w-full px-3 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition"
                >
                    Réinitialiser
                </button>
            </div>
        {/if}
    </header>

    <main class="flex-1 flex overflow-hidden">
        <!-- Sidebar desktop uniquement -->
        <aside class="w-80 bg-white border-l border-gray-200 p-5 overflow-y-auto hidden lg:block">
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

        <!-- Liste des insignes -->
        <div class="flex-1 overflow-y-auto p-3 md:p-6">
            <div class="mb-4 flex items-center justify-between">
                <span class="text-xs md:text-sm text-gray-600">{filteredInsignes.length} insigne(s) trouvée(s)</span>
            </div>

            {#if groupByLetter}
                {#each Object.keys(groupedInsignes).sort() as letter}
                    <h2 class="text-lg md:text-xl font-semibold text-gray-800 mt-6 md:mt-10 mb-3 md:mb-4 border-b border-gray-200 pb-1">{letter}</h2>

                    <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 md:gap-6">
                        {#each groupedInsignes[letter] as insigne}
                            <button
                                type="button"
                                on:mouseenter={() => hovered = insigne}
                                on:mouseleave={() => hovered = null}
                                on:click={() => openPopup(insigne)}
                                class="flex flex-col items-center bg-white rounded-xl md:rounded-2xl shadow-sm hover:shadow-md active:shadow-lg hover:-translate-y-1 active:scale-95 transition-all p-2 md:p-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                {#if insigne.image}
                                    <img src={insigne.image} alt={insigne.nom} class="w-12 h-12 md:w-16 md:h-16 object-contain mb-1 md:mb-2"/>
                                {:else}
                                    <div class="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-gray-100 rounded-full mb-1 md:mb-2 text-gray-500 font-medium text-sm md:text-base">
                                        {insigne.nom[0]}
                                    </div>
                                {/if}
                                <span class="text-xs md:text-sm text-gray-700 font-medium text-center truncate w-full block"
                                      title={insigne.nom}>
                                    {insigne.nom}
                                </span>
                            </button>
                        {/each}
                    </div>
                {/each}
            {:else}
                <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 md:gap-6">
                    {#each filteredInsignes as insigne}
                        <button
                            type="button"
                            on:mouseenter={() => hovered = insigne}
                            on:mouseleave={() => hovered = null}
                            on:click={() => openPopup(insigne)}
                            class="flex flex-col items-center bg-white rounded-xl md:rounded-2xl shadow-sm hover:shadow-md active:shadow-lg hover:-translate-y-1 active:scale-95 transition-all p-2 md:p-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            {#if insigne.image}
                                <img src={insigne.image} alt={insigne.nom} class="w-12 h-12 md:w-16 md:h-16 object-contain mb-1 md:mb-2"/>
                            {:else}
                                <div class="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-gray-100 rounded-full mb-1 md:mb-2 text-gray-500 font-medium text-sm md:text-base">
                                    {insigne.nom[0]}
                                </div>
                            {/if}
                            <span class="text-xs md:text-sm text-gray-700 font-medium text-center truncate w-full block"
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

{#if selectedInsigne}
    <div 
        class="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-4"
        on:click={closePopup}
        on:keydown={(e) => (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') && closePopup()}
        role="dialog"
        aria-modal="true"
        tabindex="0"
    >
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div 
            class="bg-white md:my-16 w-full md:max-w-3xl md:rounded-2xl rounded-t-3xl shadow-2xl transform transition-transform animate-in slide-in-from-bottom md:slide-in-from-bottom-0"
            on:click|stopPropagation
            on:keydown|stopPropagation
        >
            <div class="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900">Détails de l'insigne</h3>
                <button
                    on:click={closePopup}
                    class="p-2 hover:bg-gray-100 rounded-full transition"
                    aria-label="Fermer"
                >
                    <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div class="p-6 max-h-[70vh] md:max-h-[80vh] overflow-y-auto">
                <div class="flex flex-col items-center text-center mb-6">
                    {#if selectedInsigne.image}
                        <img src={selectedInsigne.image} alt={selectedInsigne.nom} class="w-32 h-32 object-contain mb-4"/>
                    {:else}
                        <div class="w-32 h-32 flex items-center justify-center bg-gray-100 rounded-full mb-4 text-gray-500 font-bold text-4xl">
                            {selectedInsigne.nom[0]}
                        </div>
                    {/if}
                    <h2 class="text-xl font-bold text-gray-900 mb-2">{selectedInsigne.nom}</h2>
                    <p class="text-sm text-gray-600 italic leading-relaxed">{selectedInsigne.description}</p>
                </div>

                <div class="space-y-4 text-sm">
                    <div class="bg-gray-50 rounded-lg p-4">
                        <p class="font-semibold text-gray-900 mb-1">Catégories</p>
                        <p class="text-gray-700">{selectedInsigne.categories.map(toStringCategorie).join(", ")}</p>
                    </div>

                    <div class="bg-gray-50 rounded-lg p-4">
                        <p class="font-semibold text-gray-900 mb-1">Localisation</p>
                        <p class="text-gray-700">{localisationToString(selectedInsigne.localisation)}</p>
                    </div>

                    <div class="bg-gray-50 rounded-lg p-4">
                        <p class="font-semibold text-gray-900 mb-1">Filière</p>
                        <p class="text-gray-700">{toStringFiliere(selectedInsigne.filiere)}</p>
                    </div>
                </div>
            </div>

            <div class="p-4 border-t border-gray-200">
                <button
                    on:click={closePopup}
                    class="w-full py-3 bg-gray-600 hover:bg-gray-600 text-white font-medium rounded-lg transition"
                >
                    Fermer
                </button>
            </div>
        </div>
    </div>
{/if}

<style>
    @keyframes slide-in-from-bottom {
        from {
            transform: translateY(100%);
        }
        to {
            transform: translateY(0);
        }
    }

    @keyframes fade-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .animate-in {
        animation: fade-in 0.2s ease-out, slide-in-from-bottom 0.3s ease-out;
    }
</style>