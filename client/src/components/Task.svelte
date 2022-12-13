<script lang="ts">
    import type { Task } from "../http/models";

    export let task: Task
</script>

<main>
    <div class="task">
        <h3>
            #{task.id} {task.name}
            <button class="sm"> Let it {'>>'} </button>
        </h3>
        <p>{task.description}</p>
    </div>
</main>

<style>
    .task {
        padding: 15px;
        border: 1px solid rgb(207, 207, 207);
        border-radius: 5px;
    }

    .task h3 {
        display: flex;
        justify-content: space-between;
    }
</style>
