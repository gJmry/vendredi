<script lang="ts">
    import insignes from "$lib/data/insignes.json" with { type: 'json' };
    import type {Insigne} from "$lib/entity/Insigne.ts";

    import {Filiere, toStringFiliere} from "$lib/enum/Filiere.js";
    import {Categorie, toStringCategorie} from "$lib/enum/Categorie.js";
    import {Localisation, localisationToString} from "$lib/enum/Localisation.js";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import FiltresInsigne from "$lib/components/FiltresInsigne.svelte";
  import ListeInsigne from "$lib/components/ListeInsigne.svelte";
  import ModalInsigne from "$lib/components/ModalInsigne.svelte";

    let hovered: Insigne | null = null;
    let selectedInsigne: Insigne | null = null;
    let showFilters = false;

    let groupByLetter = true;
    let selectedFiliere: Filiere | "all" = "all";
    let selectedCategorie: Categorie | "all" = "all";
    let selectedLocalisation: Localisation | "all" = "all";
    let sortBy: "nom" | "filiere" | "categorie" | "localisation" = "nom";
    let searchQuery = "";
    let darkMode = false;

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

    <div class="flex flex-col h-screen {darkMode ? 'bg-slate-900' : 'bg-slate-100'}">
        <FiltresInsigne
            {darkMode}
            {showFilters}
            bind:searchQuery
            bind:groupByLetter
            bind:selectedFiliere
            bind:selectedCategorie
            bind:selectedLocalisation
            bind:sortBy
            onResetFilters={resetFilters}
            onToggleFilters={() => showFilters = !showFilters}
            onToggleDarkMode={() => darkMode = !darkMode}
        />

    <main class="flex-1 flex overflow-hidden">
        <Sidebar {hovered} {darkMode} />
        
        <!-- Liste des insignes -->
        <ListeInsigne
            {darkMode}
            {groupByLetter}
            {filteredInsignes}
            {groupedInsignes}
            onHover={(insigne) => hovered = insigne}
            onOpenPopup={openPopup}
        />
    </main>
</div>

{#if selectedInsigne}
    <ModalInsigne
        {darkMode}
        {selectedInsigne}
        on:close={closePopup}
    />
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