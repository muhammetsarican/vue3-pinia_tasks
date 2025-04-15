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

    <!-- loading - start -->
    <div class="loading" v-if="loading">
      <p>Tasks loading...</p>
    </div>
    <!-- loading - end -->

    <!-- tasks - start -->
    <div class="task-list" v-if="filter === 'all'">
      <p>The {{ totalCount }} tasks left to do in total</p>
      <div v-for="task in tasks" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>

    <div class="task-list" v-if="filter === 'favs'">
      <p>The {{ favsCount }} tasks left to do in favs</p>
      <div v-for="task in favs" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>
    <!-- tasks - end -->

    <!-- reset - start -->
    <div class="reset">
      <button @click="taskStore.$reset">Reset State</button>
    </div>
    <!-- reset - end -->
  </main>
</template>

<script>
import TaskDetails from "./components/TaskDetails.vue";
import TaskForm from "./components/TaskForm.vue";
import { useTaskStore } from "./stores/TaskStore";
import { ref } from "vue";
import { storeToRefs } from "pinia";
export default {
  components: { TaskDetails, TaskForm },
  setup() {
    const taskStore = useTaskStore();
    const filter = ref("all");

    const { tasks, favs, favsCount, totalCount, loading } =
      storeToRefs(taskStore);

    // fetch tasks
    taskStore.getTasks();

    return {
      taskStore,
      filter,
      tasks,
      favs,
      favsCount,
      totalCount,
      loading,
    };
  },
};
</script>