import { useRef, useState } from 'react';

function Note({ no, id, value, done, at, setDumbRender }) {
  const [editing, setEditing] = useState(false);
  const ref = useRef(null);

  const handleEdit = () => {
    if (!ref) return;
    setEditing(true);
    setTimeout(() => ref.current.focus(), 0);
  };

  const handleSave = async () => {
    const newVal = ref.current.value;
    if (newVal === value) return;
    await fetch('http://localhost:5000/api/notes', {
      method: 'PUT',
      body: JSON.stringify({ id, value: newVal, type: 'value' }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setEditing(false);
    setDumbRender((p) => !p);
  };

  const handleChecked = async () => {
    await fetch('http://localhost:5000/api/notes', {
      method: 'PUT',
      body: JSON.stringify({ id, value: Number(!done), type: 'done' }),
      headers: { 'Content-Type': 'application/json' },
    });
    setDumbRender((p) => !p);
  };

  const handleDelete = async () => {
    await fetch('http://localhost:5000/api/notes', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setDumbRender((p) => !p);
  };

  const date = new Date(at);

  return (
    <li className='mb-7 relative flex items-center justify-between rounded-md bg-white py-2 px-6'>
      <span>{no}.</span>
      <div className='mx-4 grow'>
        <input
          ref={ref}
          className={`w-full pl-2 font-medium ${
            editing ? 'pointer-events-auto' : 'pointer-events-none'
          } ${done ? 'line-through opacity-60' : ''}`}
          type='text'
          defaultValue={value}
        />
      </div>
      <input onClick={handleChecked} className='mx-2 cursor-pointer' type='checkbox' defaultChecked={done} />
      {editing ? (
        <button onClick={handleSave} className='rounded-sm bg-blue-400 px-2 py-[2px]'>
          save
        </button>
      ) : (
        <button onClick={handleEdit} className='rounded-sm bg-blue-400 px-2 py-[2px]'>
          edit
        </button>
      )}
      <button onClick={handleDelete} className='ml-3 rounded-sm bg-red-400 px-2 py-[2px]'>
        delete
      </button>
      <div className='absolute right-2 -bottom-5 text-sm'>
        <span className='mr-4'>{date.toLocaleDateString()}</span>
        <span>{date.toLocaleTimeString()}</span>
      </div>
    </li>
  );
}

export default Note;
