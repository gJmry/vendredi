<script lang="ts">
    import {Filiere, toStringFiliere} from "$lib/enum/Filiere.js";
    import {Categorie, toStringCategorie} from "$lib/enum/Categorie.js";
    import {Localisation, localisationToString} from "$lib/enum/Localisation.js";

    export let darkMode: boolean;
    export let showFilters: boolean;
    export let searchQuery: string;
    export let groupByLetter: boolean;
    export let selectedFiliere: Filiere | "all";
    export let selectedCategorie: Categorie | "all";
    export let selectedLocalisation: Localisation | "all";
    export let sortBy: "nom" | "filiere" | "categorie" | "localisation";
    export let onResetFilters: () => void;
    export let onToggleFilters: () => void;
    export let onToggleDarkMode: () => void;

    function truncate(text: string, max: number) {
        return text.length > max ? text.slice(0, max) + "…" : text;
    }
</script>

<header class="{darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-md p-3 md:p-4 border-b sticky top-0 z-10">
    <div class="flex items-center gap-2 mb-3">
        <h1 class="text-lg md:text-2xl font-bold {darkMode ? 'text-slate-100' : 'text-slate-800'} flex-1">Insignes</h1>
        
        <button
            on:click={onToggleDarkMode}
            class="{darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'} p-2 rounded-lg transition"
            aria-label="Toggle dark mode"
        >
            {#if darkMode}
                <svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            {:else}
                <svg class="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            {/if}
        </button>

        <button
            on:click={onToggleFilters}
            class="md:hidden px-3 py-2 text-sm {darkMode ? 'bg-slate-600 hover:bg-slate-500' : 'bg-slate-700 hover:bg-slate-800'} text-white rounded-lg flex items-center gap-1 shadow transition"
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
        class="w-full {darkMode ? 'border-slate-600 bg-slate-700 text-slate-100 placeholder:text-slate-400 focus:ring-slate-500' : 'border-slate-300 bg-white focus:ring-slate-400'} border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:border-transparent shadow-sm"
    />

    <div class="hidden md:flex flex-wrap items-center gap-2 mt-3">
        <select bind:value={groupByLetter} class="{darkMode ? 'border-slate-600 bg-slate-700 text-slate-100 hover:border-slate-500 focus:ring-slate-500' : 'border-slate-300 bg-white hover:border-slate-400 focus:ring-slate-400'} border rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:outline-none transition">
            <option value={false}>Affichage simple</option>
            <option value={true}>Regrouper par lettre</option>
        </select>

        <select
            bind:value={selectedFiliere}
            class="{darkMode ? 'border-slate-600 bg-slate-700 text-slate-100 hover:border-slate-500 focus:ring-slate-500' : 'border-slate-300 bg-white hover:border-slate-400 focus:ring-slate-400'} border rounded-lg px-3 py-2 text-sm max-w-[180px] shadow-sm focus:ring-2 focus:outline-none transition"
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

        <select bind:value={selectedCategorie} class="{darkMode ? 'border-slate-600 bg-slate-700 text-slate-100 hover:border-slate-500 focus:ring-slate-500' : 'border-slate-300 bg-white hover:border-slate-400 focus:ring-slate-400'} border rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:outline-none transition">
            <option value="all">Toutes Catégories</option>
            {#each Object.values(Categorie) as c (c)}
                {#if typeof c === "number"}
                    <option value={c}>{toStringCategorie(c)}</option>
                {/if}
            {/each}
        </select>

        <select bind:value={selectedLocalisation} class="{darkMode ? 'border-slate-600 bg-slate-700 text-slate-100 hover:border-slate-500 focus:ring-slate-500' : 'border-slate-300 bg-white hover:border-slate-400 focus:ring-slate-400'} border rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:outline-none transition">
            <option value="all">Toutes Localisations</option>
            {#each Object.values(Localisation) as l (l)}
                {#if typeof l === "number"}
                    <option value={l}>{localisationToString(l)}</option>
                {/if}
            {/each}
        </select>

        <select bind:value={sortBy} class="{darkMode ? 'border-slate-600 bg-slate-700 text-slate-100 hover:border-slate-500 focus:ring-slate-500' : 'border-slate-300 bg-white hover:border-slate-400 focus:ring-slate-400'} border rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:outline-none transition">
            <option value="nom">Trier par Nom</option>
            <option value="filiere">Trier par Filière</option>
            <option value="categorie">Trier par Catégorie</option>
            <option value="localisation">Trier par Localisation</option>
        </select>

        <button
            on:click={onResetFilters}
            class="px-4 py-2 text-sm {darkMode ? 'bg-slate-700 hover:bg-slate-600 text-slate-100' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'} rounded-lg shadow-sm transition font-medium"
        >
            Réinitialiser
        </button>
    </div>

    <!-- Panneau filtres mobile -->
    {#if showFilters}
        <div class="md:hidden mt-3 p-3 {darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'} rounded-lg border space-y-2 shadow-sm">
            <select bind:value={groupByLetter} class="w-full {darkMode ? 'border-slate-600 bg-slate-700 text-slate-100' : 'border-slate-300 bg-white'} border rounded-lg px-3 py-2.5 text-sm shadow-sm">
                <option value={false}>Affichage simple</option>
                <option value={true}>Regrouper par lettre</option>
            </select>

            <select
                bind:value={selectedFiliere}
                class="w-full {darkMode ? 'border-slate-600 bg-slate-700 text-slate-100' : 'border-slate-300 bg-white'} border rounded-lg px-3 py-2.5 text-sm shadow-sm"
            >
                <option value="all">Toutes Filières</option>
                {#each Object.values(Filiere) as f (f)}
                    {#if typeof f === "number"}
                        <option value={f}>{toStringFiliere(f)}</option>
                    {/if}
                {/each}
            </select>

            <select bind:value={selectedCategorie} class="w-full {darkMode ? 'border-slate-600 bg-slate-700 text-slate-100' : 'border-slate-300 bg-white'} border rounded-lg px-3 py-2.5 text-sm shadow-sm">
                <option value="all">Toutes Catégories</option>
                {#each Object.values(Categorie) as c (c)}
                    {#if typeof c === "number"}
                        <option value={c}>{toStringCategorie(c)}</option>
                    {/if}
                {/each}
            </select>

            <select bind:value={selectedLocalisation} class="w-full {darkMode ? 'border-slate-600 bg-slate-700 text-slate-100' : 'border-slate-300 bg-white'} border rounded-lg px-3 py-2.5 text-sm shadow-sm">
                <option value="all">Toutes Localisations</option>
                {#each Object.values(Localisation) as l (l)}
                    {#if typeof l === "number"}
                        <option value={l}>{localisationToString(l)}</option>
                    {/if}
                {/each}
            </select>

            <select bind:value={sortBy} class="w-full {darkMode ? 'border-slate-600 bg-slate-700 text-slate-100' : 'border-slate-300 bg-white'} border rounded-lg px-3 py-2.5 text-sm shadow-sm">
                <option value="nom">Trier par Nom</option>
                <option value="filiere">Trier par Filière</option>
                <option value="categorie">Trier par Catégorie</option>
                <option value="localisation">Trier par Localisation</option>
            </select>

            <button
                on:click={onResetFilters}
                class="w-full px-3 py-2.5 text-sm {darkMode ? 'bg-slate-700 hover:bg-slate-600 text-slate-100' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'} rounded-lg transition font-medium"
            >
                Réinitialiser
            </button>
        </div>
    {/if}
</header>