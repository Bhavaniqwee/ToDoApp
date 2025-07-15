import React,{useState,useEffect} from 'react';
import axios from 'axios';
const TodoApp=()=>{
    const [tasks,setTasks]=useState([]);
    const [title,setTitle]=useState('');

    const loadTasks=async()=>{
        const res=await axios.get('http://127.0.0.1:8000/todo/tasks/');
        setTasks(res.data);
    };
     const addTask = async () => {
    if (!title) return;
    await axios.post('http://127.0.0.1:8000/todo/tasks/', { title, completed: false });
    setTitle('');
    loadTasks();
  };
  const toggleComplete = async (task) => {
    await axios.put(`http://127.0.0.1:8000/todo/tasks/${task.id}/`, {
      ...task,
      completed: !task.completed,
    });
    loadTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/todo/tasks/${id}/`);
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);
    return (
    <div>
      <h2>To-Do List</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New task" />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span
              onClick={() => toggleComplete(task)}
              style={{ textDecoration: task.completed ? 'line-through' : 'none', cursor: 'pointer' }}
            >
              {task.title}
            </span>
            <button onClick={() => deleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;