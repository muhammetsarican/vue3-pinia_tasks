// const { defineStore } = require("pinia");
import { defineStore } from "pinia"

export const useTaskStore = defineStore("taskStore", {
    state: () => ({
        tasks: [
            { id: 1, title: "Buy some milk", isFav: false },
            { id: 2, title: "wash your car", isFav: true },
        ],
        name: "Shinji"
    }),
    getters: {
        favs() {
            return this.tasks.filter(task => task.isFav);
        },
        favsCount() {
            return this.tasks.reduce((count, task) => task.isFav ? count += 1 : count, 0);
        },
        totalCount(state) {
            return state.tasks.length;
        }
    },
    actions: {
        addNewTask(task) {
            this.tasks.push(task);
        }
    }
})