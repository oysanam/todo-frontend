import { useEffect, useState } from 'react';
import { request } from '../api';

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  const load = () => request('/todos').then(setTodos);
  useEffect(() => { load(); }, []);

  async function add(e) {
    e.preventDefault();
    if (!title.trim()) return;
    await request('/todos', { method: 'POST', body: JSON.stringify({ title }) });
    setTitle('');
    load();
  }

  async function toggle(t) {
    await request('/todos/' + t.id, {
      method: 'PUT',
      body: JSON.stringify({ completed: !t.completed }),
    });
    load();
  }

  async function remove(id) {
    await request('/todos/' + id, { method: 'DELETE' });
    load();
  }

  function logout() {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  }

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <h2>My todos</h2>
      <form onSubmit={add}>
        <input value={title} onChange={(e) => setTitle(e.target.value)}
          placeholder="New task" />
        <button>Add</button>
      </form>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <span onClick={() => toggle(t)}
              style={{ textDecoration: t.completed ? 'line-through' : 'none', cursor: 'pointer' }}>
              {t.title}
            </span>
            <button onClick={() => remove(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
