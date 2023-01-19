<script setup>
import {ref} from 'vue';
defineProps(['totalTasks','pendingTasks']);
const emit = defineEmits(['newTask', 'removeFinishedTasks', 'searchTasks']);
var taskName=ref('');
var searchTask = ref('');
var priorityFilter = ref('');
var searchTask = ref('');
var lowPriority = ref(true);
var normalPriority = ref(true);
var highPriority = ref(true);
function newTask() {
    emit('newTask',taskName);
    taskName='';
}
function removeFinishedTasks(){
    emit('removeFinishedTasks');
}
function searchTasks(){
    emit('searchTasks', searchTask, [lowPriority, normalPriority, highPriority]);
}

</script>

<template>
    <h1>Vue Project - Armando Garrido Rodriguez</h1>
    <input type="text" id="add_task" placeholder="What would you like to remember?" v-model="taskName" @keyup.enter="newTask">
    <input type="text" id="search" placeholder="🔎 Search Tasks..." v-model="searchTask" @keyup="searchTasks">
    <div id="priority_filter">Priority
        <input id="low_checkbox" name="low_checkbox" type="checkbox" value="Low" v-model="lowPriority" checked @change="searchTasks">
        <label for="low_checkbox" id="low_checkbox_label">Low</label>

        <input id="normal_checkbox" name="normal_checkbox" type="checkbox" value="Normal" v-model="normalPriority" checked @change="searchTasks">
        <label for="normal_checkbox" id="normal_checkbox_label">Normal</label>

        <input id="high_checkbox" name="high_checkbox" type="checkbox" value="High" v-model="highPriority" checked @change="searchTasks">
        <label for="high_checkbox" id="high_checkbox_label">High</label>
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