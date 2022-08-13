import { useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { queryClient } from '../App';

function Note({ no, id, value, done, at }) {
  const [editing, setEditing] = useState(false);
  const ref = useRef(null);

  const mutation = useMutation((body) => updateNote(body), {
    onSuccess: () => queryClient.invalidateQueries('notes'),
  });

  const handleEdit = () => {
    if (!ref) return;
    setEditing(true);
    setTimeout(() => ref.current.focus(), 0);
  };

  const handleSave = () => {
    const newVal = ref.current.value;
    mutation.mutate({ body: { id, value: newVal, type: 'value' } });
    setEditing(false);
  };

  const handleChecked = () => {
    mutation.mutate({ body: { id, value: Number(!done), type: 'done' } });
  };

  const handleDelete = () => {
    mutation.mutate({ body: { id }, method: 'DELETE' });
  };

  const date = new Date(at);

  return (
    <li className='relative mb-7 flex items-center justify-between rounded-md bg-white py-2 px-6'>
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
      <input
        onClick={handleChecked}
        className='mx-2 cursor-pointer'
        type='checkbox'
        defaultChecked={done}
      />
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

const updateNote = async ({ body, method = 'PUT' }) => {
  const result = await fetch('http://localhost:5000/api/notes', {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!result.ok) throw new Error('update operation failed');
  return result;
};
