<script setup lang="ts">
import { onMounted, ref, } from 'vue';
import Modal from './components/modal.vue'
import { useTaskAPI, type Task } from './hooks/useTaskAPI'

const { tasks, getTasks, addTask } = useTaskAPI()

const showAddModal = ref(false)

const newTask: Pick<Task, 'title' | 'description'> = {
  title: '',
  description: ''
}

onMounted(() => {
  getTasks()
})

const restNewTask = () => {
  newTask.title = ''
  newTask.description = ''
}

const handleShowAddModal = () => {
  showAddModal.value = true
  restNewTask()
}

const handleAddTask = () => {
  addTask(newTask)
  showAddModal.value = false
  restNewTask()
}

</script>

<template>
  <div class="container mx-auto">
    <header class="mb-4 flex justify-between">
      <h1 class="text-4xl font-bold">Tasks</h1>
      <button id="show-modal" @click="handleShowAddModal()">Add New</button>

      <Teleport to="body">
        <modal :show="showAddModal" @close="showAddModal = false">
          <template #header>
            <h3>Add new Task </h3>
          </template>
          <template #body>
            <input type="text" placeholder="Title" v-model="newTask.title" />
            <input type="text" placeholder="Description" v-model="newTask.description" />
          </template>
          <template #footer>
            <div class="flex justify-end gap-4">
              <button @click="showAddModal = false">Cancel</button>
              <button @click="handleAddTask" class="text-blue-500">Save</button>
            </div>
          </template>
        </modal>
      </Teleport>
    </header>

    <div class="grid grid-cols-2 pb-2 rounded-md shadow-none p-2 mb-2 bg-gray-200">
      <h2 class="font-bold">Title</h2>
      <h2 class="font-bold">Completed</h2>
    </div>

    <div v-for="task in tasks" :key="task.id" class="grid grid-cols-2 gap-4 rounded-md shadow-md p-2 ">
      <div>
        <h2 class="text-lg font-semibold" :class="{ 'line-through': task.completed }">{{ task.title }}</h2>
        <p class="text-gray-600" :style="{ opacity: task.completed ? '0.3' : '1' }">{{ task.description }}</p>
        <p class="text-xs text-gray-700" :style="{ opacity: task.completed ? '0.3' : '1' }">
          {{ new Date(task.updated_at).toLocaleString() }}
        </p>
      </div>
      <p>
        <span v-if="task.completed" class="text-green-500">Completed</span>
        <span v-else class="text-red-500">Not Completed</span>
      </p>
    </div>
  </div>
</template>

