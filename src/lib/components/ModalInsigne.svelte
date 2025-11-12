<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import {toStringFiliere} from "$lib/enum/Filiere.js";
    import {toStringCategorie} from "$lib/enum/Categorie.js";
    import {localisationToString} from "$lib/enum/Localisation.js";
    import type {Insigne} from "$lib/entity/Insigne.ts";

    export let darkMode: boolean;
    export let selectedInsigne: Insigne;

    const dispatch = createEventDispatcher();

    function closePopup() {
        dispatch('close');
    }
</script>
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
        class="{darkMode ? 'bg-slate-800' : 'bg-white'} md:my-16 w-full md:max-w-3xl md:max-h-[80vh] flex flex-col rounded-t-2xl md:rounded-2xl shadow-2xl transform animate-slide-up overflow-hidden"        on:click|stopPropagation
        on:keydown|stopPropagation
    >
        <div class="flex items-center justify-between p-4 {darkMode ? 'border-slate-700 bg-slate-700' : 'border-slate-200 bg-slate-50'} border-b">
            <h3 class="text-lg font-bold {darkMode ? 'text-slate-100' : 'text-slate-800'}">Détails de l'insigne</h3>
            <button
                on:click={closePopup}
                class="{darkMode ? 'hover:bg-slate-600' : 'hover:bg-slate-200'} p-2 rounded-lg transition"
                aria-label="Fermer"
            >
                <svg class="w-5 h-5 {darkMode ? 'text-slate-300' : 'text-slate-600'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <div class="p-6 max-h-[70vh] md:max-h-[80vh] overflow-y-auto">
            <div class="flex flex-col items-center text-center mb-6 {darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-xl p-6 shadow-sm">
                {#if selectedInsigne.image}
                    <div class="{darkMode ? 'bg-slate-800' : 'bg-white'} rounded-lg p-4 shadow-md mb-4">
                        <img src={selectedInsigne.image} alt={selectedInsigne.nom} class="w-28 h-28 object-contain"/>
                    </div>
                {:else}
                    <div class="w-32 h-32 flex items-center justify-center {darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-600'} rounded-lg mb-4 font-bold text-5xl shadow-md">
                        {selectedInsigne.nom[0]}
                    </div>
                {/if}
                <h2 class="text-2xl font-bold {darkMode ? 'text-slate-100' : 'text-slate-900'} mb-2">{selectedInsigne.nom}</h2>
                <p class="text-sm {darkMode ? 'text-slate-300' : 'text-slate-600'} italic leading-relaxed max-w-md">{selectedInsigne.description}</p>
            </div>

            <div class="space-y-3 text-sm">
                <div class="{darkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'} rounded-xl p-4 shadow-sm border">
                    <p class="font-bold {darkMode ? 'text-slate-100' : 'text-slate-800'} mb-2">Catégories</p>
                    <p class="{darkMode ? 'text-slate-300' : 'text-slate-700'}">{selectedInsigne.categories.map(toStringCategorie).join(", ")}</p>
                </div>

                <div class="{darkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'} rounded-xl p-4 shadow-sm border">
                    <p class="font-bold {darkMode ? 'text-slate-100' : 'text-slate-800'} mb-2">Localisation</p>
                    <p class="{darkMode ? 'text-slate-300' : 'text-slate-700'}">{localisationToString(selectedInsigne.localisation)}</p>
                </div>

                <div class="{darkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'} rounded-xl p-4 shadow-sm border">
                    <p class="font-bold {darkMode ? 'text-slate-100' : 'text-slate-800'} mb-2">Filière</p>
                    <p class="{darkMode ? 'text-slate-300' : 'text-slate-700'}">{toStringFiliere(selectedInsigne.filiere)}</p>
                </div>
            </div>
        </div>

        <div class="p-4 {darkMode ? 'border-slate-700 bg-slate-700' : 'border-slate-200 bg-slate-50'} border-t">
            <button
                on:click={closePopup}
                class="w-full py-3 {darkMode ? 'bg-slate-600 hover:bg-slate-500' : 'bg-slate-700 hover:bg-slate-800'} text-white font-semibold rounded-lg transition shadow-md"
            >
                Fermer
            </button>
        </div>
    </div>
</div>