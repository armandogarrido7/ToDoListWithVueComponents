<script setup>
import {ref} from 'vue';
defineProps(['task']);
const emit = defineEmits(['toggleDone', 'setTaskPriority', 'removeTask']);
function toggleDone(taskToToggle){
    emit('toggleDone', taskToToggle);
}
function setTaskPriority(task, priority){
    emit('setTaskPriority', task, priority);
}
function removeTask(taskToRemove){
    console.log(taskToRemove);
    emit('removeTask', taskToRemove );
}
function getTimeUntilTaskCreation(task){
    return Math.round((Date.now() - task.time) / 1000 / 60);
}
</script>

<template>
    <div class="task" :id="task.id">
        <div class="task_head"><img @click="toggleDone(task)" :src="task.done ? 'src/assets/checked.svg' : 'src/assets/not_checked.svg'" class="do_btn">
            <h2 :class="task.done ? 'task_done_text' : ''">{{ task.name }}</h2><img src="../assets/delete.png" class="delete_task" @click="removeTask(task)"></div>
        <div class="priority" :class="'selected_' + task.priority">Priority:
            <div class="low" @click="setTaskPriority(task, 'low')">Low</div>
            <div class=" normal" @click="setTaskPriority(task, 'normal')">Normal</div>
            <div class="high" @click="setTaskPriority(task, 'high')">High</div>
            <div class="time "><img src="../assets/clock.svg">Added {{ getTimeUntilTaskCreation(task) }} minutes ago</div>
        </div>
    </div>
    <hr>
</template>

<style>

</style>