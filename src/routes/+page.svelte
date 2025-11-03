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

<div class="flex flex-col h-screen bg-slate-100">
    <header class="bg-white shadow-md p-3 md:p-4 border-b border-slate-200 sticky top-0 z-10">
        <div class="flex items-center gap-2 mb-3 md:mb-0">
            <h1 class="text-lg md:text-2xl font-bold text-slate-800 flex-1">Insignes</h1>
            
            <button
                on:click={() => showFilters = !showFilters}
                class="md:hidden px-3 py-2 text-sm bg-slate-700 text-white rounded-lg flex items-center gap-1 shadow hover:bg-slate-800 transition"
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
            class="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent shadow-sm"
        />

        <div class="hidden md:flex flex-wrap items-center gap-2 mt-3">
            <select bind:value={groupByLetter} class="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white shadow-sm hover:border-slate-400 focus:ring-2 focus:ring-slate-400 focus:outline-none transition">
                <option value={false}>Affichage simple</option>
                <option value={true}>Regrouper par lettre</option>
            </select>

            <select
                bind:value={selectedFiliere}
                class="border border-slate-300 rounded-lg px-3 py-2 text-sm max-w-[180px] bg-white shadow-sm hover:border-slate-400 focus:ring-2 focus:ring-slate-400 focus:outline-none transition"
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

            <select bind:value={selectedCategorie} class="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white shadow-sm hover:border-slate-400 focus:ring-2 focus:ring-slate-400 focus:outline-none transition">
                <option value="all">Toutes Catégories</option>
                {#each Object.values(Categorie) as c (c)}
                    {#if typeof c === "number"}
                        <option value={c}>{toStringCategorie(c)}</option>
                    {/if}
                {/each}
            </select>

            <select bind:value={selectedLocalisation} class="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white shadow-sm hover:border-slate-400 focus:ring-2 focus:ring-slate-400 focus:outline-none transition">
                <option value="all">Toutes Localisations</option>
                {#each Object.values(Localisation) as l (l)}
                    {#if typeof l === "number"}
                        <option value={l}>{localisationToString(l)}</option>
                    {/if}
                {/each}
            </select>

            <select bind:value={sortBy} class="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white shadow-sm hover:border-slate-400 focus:ring-2 focus:ring-slate-400 focus:outline-none transition">
                <option value="nom">Trier par Nom</option>
                <option value="filiere">Trier par Filière</option>
                <option value="categorie">Trier par Catégorie</option>
                <option value="localisation">Trier par Localisation</option>
            </select>

            <button
                on:click={resetFilters}
                class="px-4 py-2 text-sm bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg shadow-sm transition font-medium"
            >
                Réinitialiser
            </button>
        </div>

        <!-- Panneau filtres mobile -->
        {#if showFilters}
            <div class="md:hidden mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2 shadow-sm">
                <select bind:value={groupByLetter} class="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm bg-white shadow-sm">
                    <option value={false}>Affichage simple</option>
                    <option value={true}>Regrouper par lettre</option>
                </select>

                <select
                    bind:value={selectedFiliere}
                    class="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm bg-white shadow-sm"
                >
                    <option value="all">Toutes Filières</option>
                    {#each Object.values(Filiere) as f (f)}
                        {#if typeof f === "number"}
                            <option value={f}>{toStringFiliere(f)}</option>
                        {/if}
                    {/each}
                </select>

                <select bind:value={selectedCategorie} class="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm bg-white shadow-sm">
                    <option value="all">Toutes Catégories</option>
                    {#each Object.values(Categorie) as c (c)}
                        {#if typeof c === "number"}
                            <option value={c}>{toStringCategorie(c)}</option>
                        {/if}
                    {/each}
                </select>

                <select bind:value={selectedLocalisation} class="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm bg-white shadow-sm">
                    <option value="all">Toutes Localisations</option>
                    {#each Object.values(Localisation) as l (l)}
                        {#if typeof l === "number"}
                            <option value={l}>{localisationToString(l)}</option>
                        {/if}
                    {/each}
                </select>

                <select bind:value={sortBy} class="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm bg-white shadow-sm">
                    <option value="nom">Trier par Nom</option>
                    <option value="filiere">Trier par Filière</option>
                    <option value="categorie">Trier par Catégorie</option>
                    <option value="localisation">Trier par Localisation</option>
                </select>

                <button
                    on:click={resetFilters}
                    class="w-full px-3 py-2.5 text-sm bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition font-medium"
                >
                    Réinitialiser
                </button>
            </div>
        {/if}
    </header>

    <main class="flex-1 flex overflow-hidden">
        <!-- Sidebar desktop -->
        <aside class="w-80 bg-white border-l border-slate-200 p-5 overflow-y-auto hidden lg:block shadow-lg">
            {#if hovered}
                <div class="animate-fade-in">
                    <div class="flex flex-col items-center text-center mb-4 bg-slate-50 rounded-xl p-5 shadow-sm">
                        {#if hovered.image}
                            <div class="bg-white rounded-lg p-3 shadow-md mb-3">
                                <img src={hovered.image} alt={hovered.nom} class="w-20 h-20 object-contain"/>
                            </div>
                        {/if}
                        <h2 class="text-lg font-bold text-slate-800 mb-2">{hovered.nom}</h2>
                        <p class="text-sm text-slate-600 italic leading-relaxed">{hovered.description}</p>
                    </div>

                    <div class="text-sm text-slate-700 space-y-3">
                        <div class="bg-white rounded-lg p-3 shadow-sm border border-slate-200">
                            <p class="font-semibold text-slate-800 mb-1">Catégories</p>
                            <p class="text-slate-700">{hovered.categories.map(toStringCategorie).join(", ")}</p>
                        </div>
                        <div class="bg-white rounded-lg p-3 shadow-sm border border-slate-200">
                            <p class="font-semibold text-slate-800 mb-1">Localisation</p>
                            <p class="text-slate-700">{localisationToString(hovered.localisation)}</p>
                        </div>
                        <div class="bg-white rounded-lg p-3 shadow-sm border border-slate-200">
                            <p class="font-semibold text-slate-800 mb-1">Filière</p>
                            <p class="text-slate-700">{toStringFiliere(hovered.filiere)}</p>
                        </div>
                    </div>
                </div>
            {:else}
                <div class="h-full flex items-center justify-center text-slate-400 text-center px-4">
                    <p class="text-sm italic">Survolez une insigne pour voir les détails</p>
                </div>
            {/if}
        </aside>

        <!-- Liste des insignes -->
        <div class="flex-1 overflow-y-auto p-3 md:p-6">
            <div class="mb-4 flex items-center justify-between bg-white rounded-lg p-3 shadow-sm border border-slate-200">
                <span class="text-xs md:text-sm font-semibold text-slate-700">
                    {filteredInsignes.length} insigne(s) trouvée(s)
                </span>
            </div>

            {#if groupByLetter}
                {#each Object.keys(groupedInsignes).sort() as letter}
                    <div class="bg-slate-700 text-white px-4 py-2 rounded-lg shadow-md mt-6 md:mt-10 mb-3 md:mb-4 inline-block">
                        <h2 class="text-lg md:text-xl font-bold">{letter}</h2>
                    </div>

                    <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 md:gap-6">
                        {#each groupedInsignes[letter] as insigne}
                            <button
                                type="button"
                                on:mouseenter={() => hovered = insigne}
                                on:mouseleave={() => hovered = null}
                                on:click={() => openPopup(insigne)}
                                class="flex flex-col items-center bg-white rounded-xl shadow-sm hover:shadow-lg transition p-2 md:p-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400 border border-slate-200"
                            >
                                {#if insigne.image}
                                    <div class="bg-slate-50 rounded-lg p-2 mb-1 md:mb-2">
                                        <img src={insigne.image} alt={insigne.nom} class="w-10 h-10 md:w-14 md:h-14 object-contain"/>
                                    </div>
                                {:else}
                                    <div class="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center bg-slate-200 rounded-lg mb-1 md:mb-2 text-slate-600 font-bold text-sm md:text-base">
                                        {insigne.nom[0]}
                                    </div>
                                {/if}
                                <span class="text-xs md:text-sm text-slate-800 font-medium text-center truncate w-full block"
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
                            class="flex flex-col items-center bg-white rounded-xl shadow-sm hover:shadow-lg transition p-2 md:p-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400 border border-slate-200"
                        >
                            {#if insigne.image}
                                <div class="bg-slate-50 rounded-lg p-2 mb-1 md:mb-2">
                                    <img src={insigne.image} alt={insigne.nom} class="w-10 h-10 md:w-14 md:h-14 object-contain"/>
                                </div>
                            {:else}
                                <div class="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center bg-slate-200 rounded-lg mb-1 md:mb-2 text-slate-600 font-bold text-sm md:text-base">
                                    {insigne.nom[0]}
                                </div>
                            {/if}
                            <span class="text-xs md:text-sm text-slate-800 font-medium text-center truncate w-full block"
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
        class="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
        on:click={closePopup}
        on:keydown={(e) => (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') && closePopup()}
        role="dialog"
        aria-modal="true"
        tabindex="0"
    >
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div 
            class="bg-white md:my-16 w-full md:max-w-3xl md:rounded-2xl rounded-t-2xl shadow-2xl transform animate-slide-up"
            on:click|stopPropagation
            on:keydown|stopPropagation
        >
            <div class="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
                <h3 class="text-lg font-bold text-slate-800">Détails de l'insigne</h3>
                <button
                    on:click={closePopup}
                    class="p-2 hover:bg-slate-200 rounded-lg transition"
                    aria-label="Fermer"
                >
                    <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div class="p-6 max-h-[70vh] md:max-h-[80vh] overflow-y-auto">
                <div class="flex flex-col items-center text-center mb-6 bg-slate-50 rounded-xl p-6 shadow-sm">
                    {#if selectedInsigne.image}
                        <div class="bg-white rounded-lg p-4 shadow-md mb-4">
                            <img src={selectedInsigne.image} alt={selectedInsigne.nom} class="w-28 h-28 object-contain"/>
                        </div>
                    {:else}
                        <div class="w-32 h-32 flex items-center justify-center bg-slate-200 rounded-lg mb-4 text-slate-600 font-bold text-5xl shadow-md">
                            {selectedInsigne.nom[0]}
                        </div>
                    {/if}
                    <h2 class="text-2xl font-bold text-slate-900 mb-2">{selectedInsigne.nom}</h2>
                    <p class="text-sm text-slate-600 italic leading-relaxed max-w-md">{selectedInsigne.description}</p>
                </div>

                <div class="space-y-3 text-sm">
                    <div class="bg-slate-50 rounded-xl p-4 shadow-sm border border-slate-200">
                        <p class="font-bold text-slate-800 mb-2">Catégories</p>
                        <p class="text-slate-700">{selectedInsigne.categories.map(toStringCategorie).join(", ")}</p>
                    </div>

                    <div class="bg-slate-50 rounded-xl p-4 shadow-sm border border-slate-200">
                        <p class="font-bold text-slate-800 mb-2">Localisation</p>
                        <p class="text-slate-700">{localisationToString(selectedInsigne.localisation)}</p>
                    </div>

                    <div class="bg-slate-50 rounded-xl p-4 shadow-sm border border-slate-200">
                        <p class="font-bold text-slate-800 mb-2">Filière</p>
                        <p class="text-slate-700">{toStringFiliere(selectedInsigne.filiere)}</p>
                    </div>
                </div>
            </div>

            <div class="p-4 border-t border-slate-200 bg-slate-50">
                <button
                    on:click={closePopup}
                    class="w-full py-3 bg-slate-700 hover:bg-slate-800 text-white font-semibold rounded-lg transition shadow-md"
                >
                    Fermer
                </button>
            </div>
        </div>
    </div>
{/if}

<style>
    @keyframes fade-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes slide-up {
        from {
            transform: translateY(100%);
        }
        to {
            transform: translateY(0);
        }
    }

    .animate-fade-in {
        animation: fade-in 0.2s ease-out;
    }

    .animate-slide-up {
        animation: slide-up 0.3s ease-out;
    }
</style>