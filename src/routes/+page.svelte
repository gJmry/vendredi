<script>
    import insignes from "$lib/data/insignes.json";
</script>

{#each insignes as insigne}
    {insigne.nom}
{/each}