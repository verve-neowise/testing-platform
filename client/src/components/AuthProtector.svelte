<script lang="ts">
    import { useNavigate } from 'svelte-navigator'
    import { authStore } from '../stores/auth.store';

    const navigate = useNavigate()

    $: if ($authStore == null) {
        navigate('/login')
    }

</script>

<slot></slot>

<style>
</style>