import { ref, watch } from '@vue/composition-api'
 import store from '@/store'

export default function useTaskHandler(props, emit) {
  // ------------------------------------------------

  // ------------------------------------------------
  const taskLocal = ref(props.task)
  const resetTaskLocal = () => {
    taskLocal.value = props.task.value;
  }


  watch(props.task, () => {
    resetTaskLocal()
  })

  const onSubmit = () => {
    const taskData = JSON.parse(JSON.stringify(taskLocal))
    if (props.task.value.id)
      emit('updateTask', taskData.value)
    else
      emit('addTask', taskData.value)
  }

  const assigneeOptions = []

  const resolveAvatarVariant = tags => {
    if (tags.includes('alto')) return 'primary'
    if (tags.includes('medio')) return 'warning'
    if (tags.includes('bajo')) return 'success'
    if (tags.includes('actualizado')) return 'danger'
    if (tags.includes('equipo')) return 'info'
    return 'primary'
  }
  
  const tagOptions = store.state.appTask.etiquetas

  return {
    taskLocal,
    resetTaskLocal,
    assigneeOptions,
    resolveAvatarVariant,
    tagOptions,
    onSubmit,
  }
}
