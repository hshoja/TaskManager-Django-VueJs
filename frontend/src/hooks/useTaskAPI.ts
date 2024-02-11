// api.ts
import { ref } from 'vue'

const API_URL = `http://localhost:8000/api/`

interface Task {
  id: number
  title: string
  description: string
  completed: boolean
  created_at: string
  updated_at: string
}

export function useTaskAPI() {
  const tasks = ref<Task[]>([])

  const getTasks = async () => {
    const response = await fetch(`${API_URL}tasks/`)
    const data = await response.json()
    tasks.value = data
  }

  const addTask = async (newTask: Pick<Task, 'title' | 'description'>) => {
    const response = await fetch(`${API_URL}tasks/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    })

    if (!response.ok || response.status === 400) {
      const errorData = await response.json()
      console.error('Validation error:', errorData)
      return
    }

    const data = await response.json()
    tasks.value = [...tasks.value, data]
  }

  return { tasks, getTasks, addTask }
}
