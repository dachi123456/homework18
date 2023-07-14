import { useEffect, useState } from 'react';
import './App.css';
import TodoForm from './components/todoForm';

const Crud_Key = '8B9rhhmsvWuulHTcaOKiInjbFYUAPIBqh24lO-INcpZ_2MyXpw';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  const getTasks = () => {
    fetch('/api/v1/TodoList',{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Crud_Key}`
      }
    })
    .then(response => {
      if (!response.ok) throw new Error('Unable to process the request');
      return response.json();
    })
    .then(data => {
      setTasks(data.items.map(el => {
        return{
          task: el.task,
          id: el._uuid
        }
      }))
    })

  }

  useEffect(() => {
    fetch('/api/v1/TodoList',{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Crud_Key}`
      }
    })
    .then(response => {
      if (!response.ok) throw new Error('Unable to process the request');
      return response.json();
    })
    .then(data => {
      setTasks(data.items.map(el => {
        return{
         task: el.task, 
         id: el._uuid
        }
      }))
    })
  },[])




  const onFormSubmit = (task) => {
    fetch('/api/v1/TodoList', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Crud_Key}`
      },
      body: JSON.stringify([{ task }])
    })
      .then(response => {
        if (!response.ok) throw new Error('Unable to process the request');
        return response.json();
      })
      .then(resData => {
        setTasks(prevTasks => [
          ...prevTasks,
          {
            task: resData.items[0].task,
            id: resData.items[0]._uuid
          }
        ]);
      })
      .catch(error => {
        console.log(error);
      });
  };
 
console.log(tasks)
  return (
    <div>
      <TodoForm onFormSubmit={onFormSubmit} />
      <button onClick={getTasks}>get users</button>
      <button onClick={() => setTasks([])}>clear</button>
      {tasks.map(el => (
        <div key={el.id}>
          <h2>{el.task}</h2>
          <button>isComplete</button>
          </div>
        
      ))}
    </div>
  );
}

export default App;