<template>
  <main>
    <!-- header - start -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="" />
      <h1>pinia tasks</h1>
    </header>
    <!-- header - end -->

    <!-- form - start -->
    <div class="new-task-form">
      <TaskForm />
    </div>
    <!-- form - end -->

    <nav class="filter">
      <button @click="filter = 'all'">All</button>
      <button @click="filter = 'favs'">Favs</button>
    </nav>
    <!-- tasks - start -->
    <div class="task-list" v-if="filter === 'all'">
      <p>The {{ taskStore.totalCount }} tasks left to do</p>
      <div v-for="task in taskStore.tasks" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>

    <div class="task-list" v-if="filter === 'favs'">
      <p>The {{ taskStore.favsCount }} tasks left to do</p>
      <div v-for="task in taskStore.favs" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>
    <!-- tasks - end -->
  </main>
</template>

<script>
import TaskDetails from "./components/TaskDetails.vue";
import TaskForm from "./components/TaskForm.vue";
import { useTaskStore } from "./stores/TaskStore";
import { ref } from "vue";
export default {
  components: { TaskDetails, TaskForm },
  setup() {
    const taskStore = useTaskStore();
    const filter = ref("all");
    return { taskStore, filter };
  },
};
</script>