<script lang="ts">
    import TaskItem from "../components/Task.svelte";
    import type { Task } from "../http/models";
    import { authStore } from "../stores/auth.store";
    import { httpAllTasks } from "../http/tasks.http"

    let tasks: Task[] = []
    let error: string | null = null
    let isLoading: boolean = false

    console.log(isLoading);

    function allTasks() {
        isLoading = true
        console.log(isLoading);
        
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

    allTasks()

</script>

<main>
    <header>
        <h1> Verse </h1>
        <span> {$authStore.username} </span>
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