<script lang="ts">
    import { Link } from 'svelte-navigator'

    import { httpRegister } from "../http/auth.http";
    import { setAuth } from "../stores/auth.store";

    import { navigate } from 'svelte-navigator'


    let usernameInput: HTMLInputElement
    let passwordInput: HTMLInputElement
    let nameInput: HTMLInputElement
    let groupInput: HTMLInputElement

    let isLoading: boolean = false
    let error: string | null = null

    function login(event: any) {

        isLoading = true

        httpRegister(
            usernameInput.value,
            passwordInput.value,
            nameInput.value,
            groupInput.value
        ).subscribe(response => {
            isLoading = false
            error = response.status == 'error' ? response.message : null
            setAuth(response.data)
            navigate('/')
        })
    }

</script>

<main>

    <form on:submit|preventDefault={login}>
        <h1> Verse </h1>
        {#if error}
            <span class="error"> {error} </span>
        {/if}
        <input bind:this={usernameInput} type="text" placeholder="Username">
        <input bind:this={passwordInput} type="text" placeholder="Password">

        <input bind:this={nameInput} type="text" placeholder="Name">
        <input bind:this={groupInput} type="text" placeholder="Group">

        <button disabled={isLoading}> Register </button>

        <Link to="/login"> Already have account? Login </Link>
    </form>

</main>

<style>
    main {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 10px;

    }
</style>