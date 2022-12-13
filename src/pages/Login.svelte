<script lang="ts">
    import { httpLogin } from "../http/auth.http";
    import { setAuth } from "../stores/auth.store";

    let usernameInput: HTMLInputElement
    let passwordInput: HTMLInputElement

    let isLoading: boolean = false

    function login(event: SubmitEvent) {

        isLoading = true

        httpLogin(usernameInput.value, passwordInput.value).subscribe(response => {
            isLoading = false
            setAuth(response.data)
        })
    }

</script>

<main>

    <form on:submit|preventDefault={login}>
        <h1> Verse </h1>
        <input bind:this={usernameInput} type="text" placeholder="Username">
        <input bind:this={passwordInput} type="text" placeholder="Password">
        <button> Login </button>
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