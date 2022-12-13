<script lang="ts">
    import { navigate } from 'svelte-navigator'
    import { authStore } from '../stores/auth.store';

    $: if ($authStore == null) {
        navigate('login')
    }

</script>

<slot></slot>

<style>
</style>