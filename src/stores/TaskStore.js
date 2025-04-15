// const { defineStore } = require("pinia");
import { defineStore } from "pinia"

export const useTaskStore = defineStore("taskStore", {
    state: () => ({
        tasks: [],
        name: "Shinji",
        loading: false,
        baseUrl: "http://localhost:3000/tasks"
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
        async getTasks() {
            this.loading = true;

            const tasks = await fetch(this.baseUrl);
            const data = await tasks.json();

            this.tasks = data;

            this.loading = false;
        },
        async addNewTask(task) {
            this.tasks.push(task);

            const res = await fetch(this.baseUrl, {
                method: "POST",
                body: JSON.stringify(task),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (res.err) console.log(res.err);
        },
        async deleteTask(id) {
            this.tasks = this.tasks.filter(task => task.id !== id);

            const res = await fetch(`${this.baseUrl}/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (res.err) console.log(res.err);
        },
        async toggleFav(id) {
            const task = this.tasks.find(task => task.id === id);
            task.isFav = !task.isFav;

            const res = await fetch(`${this.baseUrl}/${id}`, {
                method: "PATCH",
                body: JSON.stringify({ isFav: task.isFav }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (res.err) console.log(res.err);
        }
    }
})