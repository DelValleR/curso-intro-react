import React from 'react';
import './createTodoButton.css';

function CreateTodoButton(props) {
  const onClickButton = () => {
    props.setOpenModal((prevState) => !prevState); //lo que hace es cambiar el estado de como este a lo contrario
  };
  return (
    <button className='CreateTodoButton' onClick={onClickButton}>
      +
    </button>
  );
}

export { CreateTodoButton };
