<script setup>
import {ref} from 'vue';
defineProps(['totalTasks','pendingTasks']);
const emit = defineEmits(['newTask', 'removeFinishedTasks', 'searchTasks']);
var taskName=ref('');
var searchTask = ref('');
var priorityFilter = ref('');
var searchTask = ref('');
function newTask() {
    emit('newTask',taskName);
    taskName='';
}
function removeFinishedTasks(){
    emit('removeFinishedTasks');
}
function searchTasks(){
    emit('searchTasks', searchTask, priorityFilter);
}

</script>

<template>
    <h1>Vue Project - Armando Garrido Rodriguez</h1>
    <input type="text" id="add_task" placeholder="What would you like to remember?" v-model="taskName" @keyup.enter="newTask">
    <input type="text" id="search" placeholder="🔎 Search Tasks..." v-model="searchTask" @keyup="searchTasks">
    <div>Filter by Priority
        <select v-model="priorityFilter" @change="searchTasks">
            <option selected value="">---</option>
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
        </select>
    </div>
    <hr>
    <div id="pending_div">
        <img src="../assets/bars.svg" alt="bars">
        <span id="pending_tasks">{{ pendingTasks }}</span>
        <span id="mid">tasks pending out of a total of</span>
        <span id="total_tasks">{{ totalTasks }}</span>
        <span>|</span>
        <span id="clear_tasks" @click="removeFinishedTasks()">
            <img src="../assets/x.svg" alt="x">
            <div>Clear Done Tasks</div>
        </span>
    </div>
</template>

<style>

</style>