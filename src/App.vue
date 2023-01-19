<script setup>
import {ref} from 'vue';
import appHeader from './components/header.vue'
import task from './components/task.vue';
import appFooter from './components/footer.vue';
class Task {
    constructor(name, id) {
        this.id = id;
        this.name = name;
        this.priority = 'normal';
        this.done = false;
        this.time = Date.now();
    }
}
var searchTask = '';
var priorityFilter = '';
var tasks=ref(getAllTasks());
var tasksToShow=tasks;
var totalTasks=ref(getTotalTasks());
var pendingTasks=ref(getPendingTasks());


  function newTask(taskName) {
    var newTask = new Task(taskName, getNewTaskIndex());
    tasks.value.push(newTask);
    tasks.value.sort(orderTasks);
    updateLocalStorage();
    totalTasks.value = getTotalTasks();
    pendingTasks.value = getTotalTasks();
    }

  function getAllTasks() {
      var tasks = localStorage.tasks;
      if (tasks) return JSON.parse(tasks);
      return [];
  }

  function getNewTaskIndex() {
    let id = 0;
    let tasks = getAllTasks();
    if (tasks) {
        if (tasks.length !== 0) {
            id = tasks.sort(t => t.id).pop().id + 1
        }
    }
    return id;
  }

  function searchTasks(searchTask='', priorityFilter='') {
    priorityFilter = {
      'high':priorityFilter[2].value,
      'normal':priorityFilter[1].value,
      'low':priorityFilter[0].value,
    }
    var mytasksToShow = tasks.value;
    if (searchTask.value.trim()){
        mytasksToShow = mytasksToShow.filter(task => task.name.toLowerCase().includes(searchTask.value));
    }
    else{
      mytasksToShow=getAllTasks();
    }
    let filteredTasks = [];
    for (let task of mytasksToShow){
        if (priorityFilter[task.priority]){
          filteredTasks.push(task);
        }
    }
    tasksToShow.value=filteredTasks;
  }
  function getPendingTasks() {
    return  tasks.value.filter(task => task.done == false).length;
  }

  function getTotalTasks() {
    return tasks.value.length;
  }
  function removeTask(taskToRemove) {
      tasks.value = tasks.value.filter(task => task.id != taskToRemove.id);
      updateLocalStorage();
      pendingTasks.value = getPendingTasks();
      totalTasks.value = getTotalTasks();
  }
  function removeFinishedTasks() {
      tasks.value = tasks.value.filter(task => task.done == false);
      updateLocalStorage();
      pendingTasks.value = getPendingTasks();
      totalTasks.value = getTotalTasks();
  }
  function toggleDone(task) {
      task.done = !task.done;
      updateLocalStorage();
      pendingTasks.value = getPendingTasks();
  }
  function setTaskPriority(task, priority) {
      task.priority = priority;
      tasks.value.sort(orderTasks);
      updateLocalStorage();
  }
  function updateLocalStorage() {
      localStorage.tasks = JSON.stringify(tasks.value);
  }
  function orderTasks(task1, task2) {
      let levels = ['low', 'normal', 'high'];
      if (levels.indexOf(task1.priority) > levels.indexOf(task2.priority)) {
          return -1;
      }
      if (levels.indexOf(task1.priority) < levels.indexOf(task2.priority)) {
          return 1;
      }
      return 0;
  }
</script>

<template>
  <appHeader :totalTasks="totalTasks" :pendingTasks="pendingTasks" @newTask="newTask" @removeFinishedTasks="removeFinishedTasks" @searchTasks="searchTasks"/>
  <hr>
  <div id="tasks">
    <task v-if="tasksToShow.length > 0" v-for="task in tasksToShow" :task="task" @removeTask="removeTask" @toggleDone="toggleDone" @setTaskPriority="setTaskPriority"/>
    <h1 v-else>No Tasks To Show{{ tasksToShow.value }}</h1>

  </div>
  <appFooter></appFooter>
  <RouterView></RouterView>
</template>

