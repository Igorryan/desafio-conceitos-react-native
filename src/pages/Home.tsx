import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export interface IHandleEditTaskProps {
  taskId: number
  taskNewTitle: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskAlreadyExists = tasks.find(task => task.title === newTaskTitle)

    if(taskAlreadyExists) {
      return Alert.alert('Você não pode cadastrar uma task com o mesmo nome')
    }

    setTasks(oldState => [...oldState, {id: new Date().getTime(), title: newTaskTitle, done: false}])
  }

  function handleToggleTaskDone(id: number) {
    setTasks(oldState => oldState.map(task => task.id === id ? {...task, done: !task.done} : task))
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', [
      {text: 'Sim', onPress: () => setTasks(oldState => oldState.filter(task => task.id !== id))},
      {text: 'Não', onPress: () => {}, style: 'cancel'}
    ])
  }

  function handleEditTask({taskId, taskNewTitle} : IHandleEditTaskProps){
    setTasks(oldState => oldState.map(task => task.id === taskId ? {...task, title: taskNewTitle} : task))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})