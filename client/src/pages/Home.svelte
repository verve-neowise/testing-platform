<script lang="ts">
    import { navigate } from "svelte-navigator"
    import TaskItem from "../components/Task.svelte";
    import type { Task } from "../http/models";
    import { authStore, setAuth } from "../stores/auth.store";
    import { httpAllTasks } from "../http/tasks.http"

    let tasks: Task[] = []
    let error: string | null = null
    let isLoading: boolean = false

    function allTasks() {
        isLoading = true
        
        httpAllTasks().subscribe(result => {
            if (result.status == 'error') {
                error = result.message
                tasks = []
                isLoading = false
            }
            else if (result.status == 'success') {
                error = null
                tasks = result.data
                isLoading = false
            }
        })
    }

    function logout() {
        setAuth(null)
        navigate('login')
    }

    allTasks()

</script>

<main>
    <header>
        <h1> Verse </h1>
        <div>
            <span> {$authStore.username} </span>
            |
            <button class="sm" on:click={logout}> Log out </button>
        </div>
    </header>

    <div class="task-list">
        {#if error} 
            <span class="error">{error}</span>
        {/if}
        {#if isLoading}
            <span>Loading</span>
        {:else}
            {#each tasks as item}
                <TaskItem task={item} />
            {/each}
        {/if}
    </div>
</main>

<style>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.10);
    }

    .task-list {
        width: 60%;
        margin: 0 auto;
        padding: 15px;
    }

</style>