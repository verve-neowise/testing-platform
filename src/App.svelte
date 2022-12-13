<script lang="ts">
	import Login from "./pages/Login.svelte";
	import { authStore } from "./stores/auth.store";
</script>

<main>
	{#if $authStore == null}
		<Login/>
	{:else}
		<h1> Hello { $authStore.username } </h1>
	{/if}
</main>

<style>
</style>