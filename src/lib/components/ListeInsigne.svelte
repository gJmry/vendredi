<script lang="ts">
    import type {Insigne} from "$lib/entity/Insigne.ts";

    export let darkMode: boolean;
    export let groupByLetter: boolean;
    export let filteredInsignes: Insigne[];
    export let groupedInsignes: Record<string, Insigne[]>;
    export let onHover: (insigne: Insigne | null) => void;
    export let onOpenPopup: (insigne: Insigne) => void;
</script>

<div class="flex-1 overflow-y-auto p-3 md:p-6">
    <div class="mb-4 flex items-center justify-between {darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg p-3 shadow-sm border">
        <span class="text-xs md:text-sm font-semibold {darkMode ? 'text-slate-200' : 'text-slate-700'}">
            {filteredInsignes.length} insigne(s) trouvée(s)
        </span>
    </div>

    {#if groupByLetter}
        {#each Object.keys(groupedInsignes).sort() as letter}
            <div class="{darkMode ? 'bg-slate-700 text-slate-100' : 'bg-slate-700 text-white'} px-4 py-2 rounded-lg shadow-md mt-6 md:mt-10 mb-3 md:mb-4 inline-block">
                <h2 class="text-lg md:text-xl font-bold">{letter}</h2>
            </div>

            <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 md:gap-6">
                {#each groupedInsignes[letter] as insigne}
                    <button
                        type="button"
                        on:mouseenter={() => onHover(insigne)}
                        on:mouseleave={() => onHover(null)}
                        on:click={() => onOpenPopup(insigne)}
                        class="flex flex-col items-center {darkMode ? 'bg-slate-800 border-slate-700 focus:ring-slate-500' : 'bg-white border-slate-200 focus:ring-slate-400'} rounded-xl shadow-sm hover:shadow-lg transition p-2 md:p-4 cursor-pointer focus:outline-none focus:ring-2 border"
                    >
                        {#if insigne.image}
                            <div class="{darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg p-2 mb-1 md:mb-2">
                                <img src={insigne.image} alt={insigne.nom} class="w-10 h-10 md:w-14 md:h-14 object-contain"/>
                            </div>
                        {:else}
                            <div class="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center {darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-600'} rounded-lg mb-1 md:mb-2 font-bold text-sm md:text-base">
                                {insigne.nom[0]}
                            </div>
                        {/if}
                        <span class="text-xs md:text-sm {darkMode ? 'text-slate-200' : 'text-slate-800'} font-medium text-center truncate w-full block"
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
                    on:mouseenter={() => onHover(insigne)}
                    on:mouseleave={() => onHover(null)}
                    on:click={() => onOpenPopup(insigne)}
                    class="flex flex-col items-center {darkMode ? 'bg-slate-800 border-slate-700 focus:ring-slate-500' : 'bg-white border-slate-200 focus:ring-slate-400'} rounded-xl shadow-sm hover:shadow-lg transition p-2 md:p-4 cursor-pointer focus:outline-none focus:ring-2 border"
                >
                    {#if insigne.image}
                        <div class="{darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg p-2 mb-1 md:mb-2">
                            <img src={insigne.image} alt={insigne.nom} class="w-10 h-10 md:w-14 md:h-14 object-contain"/>
                        </div>
                    {:else}
                        <div class="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center {darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-600'} rounded-lg mb-1 md:mb-2 font-bold text-sm md:text-base">
                            {insigne.nom[0]}
                        </div>
                    {/if}
                    <span class="text-xs md:text-sm {darkMode ? 'text-slate-200' : 'text-slate-800'} font-medium text-center truncate w-full block"
                          title={insigne.nom}>
                        {insigne.nom}
                    </span>
                </button>
            {/each}
        </div>
    {/if}
</div>