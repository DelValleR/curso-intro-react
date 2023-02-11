import { useEffect, useState } from 'react';

//custom react hook (cuando solo retorna un objeto y su estado esta bien utilizar un array en el return, si retorna 3 o mas se debe utilizar un objeto)
function useLocalStorage(itemName, initialValue) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(initialValue); // este es el array de item

  useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;

        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }

        setItem(parsedItem); //va a a llamar a la funcion setItem para actualizar nuestro estado y entregar el valor que estaba guardado en localStorage
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    }, 1000);
  });

  //en esta funcion se guardan los item en el local storage y va a actualizar nuestro estado
  const saveItem = (newItem) => {
    try {
      const stringifeditem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifeditem);
      setItem(newItem);
    } catch (error) {
      setError(error);
    }
  };

  return { item, saveItem, loading, error };
}

export { useLocalStorage };
