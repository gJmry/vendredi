<script lang="ts">
    import insignes from "$lib/data/insignes.json";
    import type {Insigne} from "$lib/entity/Insigne.ts";
    import {toStringCategorie} from "$lib/enum/Categorie.js";

    let hovered: Insigne | null = null;
</script>

<div class="flex h-screen bg-gray-50">
    <aside class="w-72 bg-white border-r border-gray-200 p-4 overflow-y-auto">
        {#if hovered}
            <h2 class="text-xl font-semibold mb-2">{hovered.nom}</h2>
            <p class="text-sm text-gray-600 mb-4">{hovered.description}</p>
            <div class="text-sm text-gray-500">
                <p><span class="font-medium text-gray-700">ID:</span> {hovered.id}</p>
                <p><span
                        class="font-medium text-gray-700">Catégories :</span> {hovered.categories.map(c => toStringCategorie(c)).join(", ")}
                </p>
                <p><span class="font-medium text-gray-700">Localisation:</span> {hovered.localisation}</p>
                <p><span class="font-medium text-gray-700">Filière:</span> {hovered.filiere}</p>
            </div>
        {:else}
            <p class="text-gray-400 italic">Survolez une insigne pour voir les détails</p>
        {/if}
    </aside>

    <!-- GRID -->
    <main class="flex-1 overflow-y-auto p-6">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
            {#each insignes as insigne}
                <button
                        type="button"
                        on:mouseenter={() => hovered = insigne}
                        on:mouseleave={() => hovered = null}
                        class="flex flex-col items-center bg-white rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition p-4 cursor-pointer focus:outline-none"
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
    </main>
</div>
