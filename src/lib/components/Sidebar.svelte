<script lang="ts">
    import type {Insigne} from "$lib/entity/Insigne.ts";
    import {toStringCategorie} from "$lib/enum/Categorie.js";
    import {localisationToString} from "$lib/enum/Localisation.js";
    import {toStringFiliere} from "$lib/enum/Filiere.js";

    export let hovered: Insigne | null;
    export let darkMode: boolean;
</script>

<aside class="w-80 {darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border-l p-5 overflow-y-auto hidden lg:block shadow-lg">
    {#if hovered}
        <div class="animate-fade-in">
            <div class="flex flex-col items-center text-center mb-4 {darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-xl p-5 shadow-sm">
                {#if hovered.image}
                    <div class="{darkMode ? 'bg-slate-800' : 'bg-white'} rounded-lg p-3 shadow-md mb-3">
                        <img src={hovered.image} alt={hovered.nom} class="w-20 h-20 object-contain"/>
                    </div>
                {/if}
                <h2 class="text-lg font-bold {darkMode ? 'text-slate-100' : 'text-slate-800'} mb-2">{hovered.nom}</h2>
                <p class="text-sm {darkMode ? 'text-slate-300' : 'text-slate-600'} italic leading-relaxed">{hovered.description}</p>
            </div>

            <div class="text-sm {darkMode ? 'text-slate-300' : 'text-slate-700'} space-y-3">
                <div class="{darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'} rounded-lg p-3 shadow-sm border">
                    <p class="font-semibold {darkMode ? 'text-slate-100' : 'text-slate-800'} mb-1">Catégories</p>
                    <p class="{darkMode ? 'text-slate-300' : 'text-slate-700'}">{hovered.categories.map(toStringCategorie).join(", ")}</p>
                </div>
                <div class="{darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'} rounded-lg p-3 shadow-sm border">
                    <p class="font-semibold {darkMode ? 'text-slate-100' : 'text-slate-800'} mb-1">Localisation</p>
                    <p class="{darkMode ? 'text-slate-300' : 'text-slate-700'}">{localisationToString(hovered.localisation)}</p>
                </div>
                <div class="{darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'} rounded-lg p-3 shadow-sm border">
                    <p class="font-semibold {darkMode ? 'text-slate-100' : 'text-slate-800'} mb-1">Filière</p>
                    <p class="{darkMode ? 'text-slate-300' : 'text-slate-700'}">{toStringFiliere(hovered.filiere)}</p>
                </div>
            </div>
        </div>
    {:else}
        <div class="h-full flex items-center justify-center text-slate-400 text-center px-4">
            <p class="text-sm italic">Survolez une insigne pour voir les détails</p>
        </div>
    {/if}
</aside>

<style>
    @keyframes fade-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .animate-fade-in {
        animation: fade-in 0.2s ease-out;
    }
</style>