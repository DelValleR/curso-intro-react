import React, { createContext, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

const TodoContext = createContext();

function TodoProvider(props) {
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage('TODOS_V1', []);

  const [searchValue, setSearchValue] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const completedTodos = todos.filter((todo) => !!todo.completed).length; //Aca se sacaria el numero de todos que estan completados
  const totalTodos = todos.length; // cantidad todal de todos

  let searchedTodos = [];

  //esto es para el filtro para que aparezcan en la lista o no
  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter((todo) => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }

  const addTodo = (text) => {
    const newTodos = [...todos];
    newTodos.push({
      completed: false,
      text,
    });
    saveTodos(newTodos); //actualizacion de estado
  };

  //cada vez que reciba un texto va a buscar cual de todos los todos cumple con esa condicion
  const completeTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text); //encontrar el index
    const newTodos = [...todos];
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos); //actualizacion de estado
  };

  //para eliminar de a un todo
  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text); //encontrar el index
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1); // el todoIndex indica donde se para para empezar a eliminar y el 1 dice que solo elimine 1 solo item
    saveTodos(newTodos); //actualizacion de estado
  };

  return (
    <TodoContext.Provider
      value={{
        error,
        loading,
        totalTodos,
        completedTodos,
        searchValue,
        setSearchValue,
        searchedTodos,
        addTodo,
        completeTodo,
        deleteTodo,
        openModal,
        setOpenModal,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };
